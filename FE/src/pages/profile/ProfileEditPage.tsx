import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './ProfileEditStyle';
import Header from '@/components/common/Header';
import Button from '@/components/common/Button';
import ImageCropModal from '@/components/common/ImageCropModal';
import ConfirmModal from '@/components/common/ConfirmModal';
import { DefaultProfileImage, CameraIcon } from '@/assets/assets';
import { postS3Image, putS3Image } from '@/api/s3/s3Image';
import { putMyInfo } from '@/api/user/myInfo';
import { EditMyInfoRequest } from '@/types/myInfo';
import { useProfile } from '@/hooks/user/useProfile';
import { useGlobalStore } from '@/store/globalStore';
import { checkNicknameDuplicate } from '@/api/signUp';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { setIsProfileLoading } = useGlobalStore();
  const { myProfile } = useProfile();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: myProfile?.nickname ?? '',
    address: myProfile?.address ?? '',
    bank: myProfile?.bank ?? '',
    account: myProfile?.account ?? '',
  });

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(true);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      nickname: value,
    }));
    // 닉네임이 변경될 때마다 중복 체크 상태 초기화
    setIsNicknameChecked(false);
    setIsDuplicate(false);
  };

  const handleDuplicateCheck = async () => {
    if (formData.nickname === myProfile?.nickname) {
      setIsNicknameChecked(true);
      setIsDuplicate(false);
      return;
    }

    const response = await checkNicknameDuplicate(formData.nickname);
    setIsNicknameChecked(true);

    if (!response.isSuccess) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  // 버튼으로 이미지 선택
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < 400 || img.height < 400) {
          setConfirmOpen(true);
          e.target.value = '';
          return;
        }
        setRawImage(img.src);
        setCropModalOpen(true);
        e.target.value = '';
      };
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    setSelectedImage(croppedImageUrl);
    fetch(croppedImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const userId = localStorage.getItem('userId');
        const uniqueFileName = `profile_${userId}_${Date.now()}.jpg`;
        const file = new File([blob], uniqueFileName, { type: 'image/jpeg' });
        setImageFile(file);
      });
  };

  // PresignedUrl 받기
  const handleGetPresignedUrl = useCallback(async () => {
    if (!imageFile) {
      return null;
    }
    const response = await postS3Image({
      fileName: imageFile.name,
      contentType: imageFile.type,
    });
    const presignedUrl = response.result.presignedUrl;
    return presignedUrl;
  }, [imageFile]);

  // S3에 직접 파일을 업로드
  const handleS3Upload = async (presignedUrl: string, file: File, contentType: string) => {
    await putS3Image({
      presignedUrl: presignedUrl,
      uploadFile: file,
      header: {
        'Content-Type': contentType,
      },
    });
  };

  // 입력 필드 변경
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 프로필 수정 API 호출
  const handleUserProfileUpdate = useCallback(
    async (finalImageUrl?: string) => {
      const imageUrlToUpdate = finalImageUrl ?? selectedImage ?? myProfile?.profileImageUrl ?? '';
      try {
        const profileData: EditMyInfoRequest = {
          ...formData,
          profileImageUrl: imageUrlToUpdate,
        };
        await putMyInfo(profileData);
        navigate('/profileDetail');
      } catch (error) {
        alert('프로필 정보 업데이트에 실패했습니다.');
        throw error;
      }
    },
    [formData, selectedImage, myProfile?.profileImageUrl, navigate]
  );

  const handleSubmit = async () => {
    // 닉네임이 변경되었을 때만 검증
    if (formData.nickname !== myProfile?.nickname) {
      if (!isNicknameChecked) {
        alert('닉네임 중복 확인이 필요합니다.');
        return;
      }
      if (isDuplicate) {
        alert('중복된 닉네임은 사용할 수 없습니다.');
        return;
      }
      if (formData.nickname.length > 10) {
        alert('닉네임은 최대 10자까지 입력할 수 있습니다.');
        return;
      }
      if (formData.nickname === '') {
        alert('닉네임을 입력해주세요.');
        return;
      }
    }

    setIsUploading(true);
    let finalImageUrlForProfileUpdate = selectedImage;

    if (imageFile) {
      try {
        const presignedUrl = await handleGetPresignedUrl();
        if (!presignedUrl) {
          alert('이미지 업로드 준비에 실패했습니다. 다시 시도해주세요.');
          setIsUploading(false);
          return;
        }

        await handleS3Upload(presignedUrl, imageFile, imageFile.type);
        finalImageUrlForProfileUpdate = presignedUrl.split('?')[0];
      } catch {
        alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
        setIsUploading(false);
        return;
      }
    }

    await handleUserProfileUpdate(
      finalImageUrlForProfileUpdate === null ? undefined : finalImageUrlForProfileUpdate
    );

    setIsUploading(false);
    setIsProfileLoading(false);
  };

  return (
    <S.PageContainer>
      <Header type="profileEdit" hasBorder />
      <S.ContentsContainer>
        <S.InfoContainer>
          <S.ImageContainer>
            <S.ImageLabel htmlFor="avatar-input">
              <S.ImageInput
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
              />
              <S.Image>
                <S.UploadedImage
                  src={selectedImage ?? myProfile?.profileImageUrl ?? DefaultProfileImage}
                  alt="프로필 이미지"
                />
              </S.Image>
              <S.CameraIcon src={CameraIcon} alt="camera" />
            </S.ImageLabel>
          </S.ImageContainer>

          <S.TextContainer>
            <S.InputContainer>
              <S.Label htmlFor="nickname">닉네임</S.Label>
              <S.Input
                id="nickname"
                placeholder="닉네임을 입력하세요"
                value={formData.nickname}
                onChange={handleNicknameChange}
              />
              <S.CheckContainer>
                {formData.nickname === myProfile?.nickname ? (
                  <S.Phrase type="error"></S.Phrase>
                ) : formData.nickname.length > 10 ? (
                  <S.Phrase type="error">최대 10자까지 입력할 수 있습니다.</S.Phrase>
                ) : formData.nickname === '' ? (
                  <S.Phrase type="error">닉네임을 입력해주세요.</S.Phrase>
                ) : isNicknameChecked && !isDuplicate ? (
                  <S.Phrase type="success">사용 가능한 닉네임입니다.</S.Phrase>
                ) : isNicknameChecked && isDuplicate ? (
                  <S.Phrase type="error">중복된 닉네임입니다.</S.Phrase>
                ) : (
                  <S.Phrase type="error"></S.Phrase>
                )}
                <S.DuplicateCheckButtonContainer>
                  <S.DuplicateCheckButton onClick={handleDuplicateCheck}>
                    중복확인
                  </S.DuplicateCheckButton>
                </S.DuplicateCheckButtonContainer>
              </S.CheckContainer>
            </S.InputContainer>
            <S.InputContainer>
              <S.Label htmlFor="address">주소</S.Label>
              <S.Input
                id="address"
                placeholder="주소를 입력하세요"
                value={formData.address}
                onChange={handleInputChange}
              />
            </S.InputContainer>
            <S.BankContainer>
              <S.InputContainer>
                <S.Label htmlFor="bank">은행</S.Label>
                <S.Input
                  id="bank"
                  placeholder="은행명을 입력하세요"
                  value={formData.bank}
                  onChange={handleInputChange}
                />
              </S.InputContainer>
              <S.InputContainer>
                <S.Label htmlFor="account">계좌</S.Label>
                <S.Input
                  id="account"
                  placeholder="계좌를 입력하세요"
                  value={formData.account}
                  onChange={handleInputChange}
                />
              </S.InputContainer>
            </S.BankContainer>
          </S.TextContainer>
        </S.InfoContainer>
        <Button
          text={isUploading ? '업로드 중...' : '수정하기'}
          onClick={handleSubmit}
          disabled={isUploading || formData.nickname === ''}
        />
      </S.ContentsContainer>
      <ImageCropModal
        open={cropModalOpen}
        image={rawImage}
        onClose={() => setCropModalOpen(false)}
        onCropComplete={handleCropComplete}
      />
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        title="이미지 크기 오류"
        text={`이미지의 최소 크기는 400x400px입니다.\n더 큰 이미지를 선택해주세요.`}
        confirmText="확인"
      />
    </S.PageContainer>
  );
};

export default ProfileEditPage;
