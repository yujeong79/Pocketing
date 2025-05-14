import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './ProfileEditStyle';
import Header from '@/components/common/Header';
import Button from '@/components/common/Button';
import { DefaultProfileImage, CameraIcon } from '@/assets/assets';
import { postS3Image, putS3Image } from '@/api/s3/s3Image';
import { putMyInfo, getMyInfo } from '@/api/user/myInfo';
import { EditMyInfoRequest } from '@/types/myInfo';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 사용자가 선택한 이미지의 미리보기 URL
  const [imageFile, setImageFile] = useState<File | null>(null); // 사용자가 선택한 실제 이미지 파일
  const [isUploading, setIsUploading] = useState(false);

  const [currentProfileImage, setCurrentProfileImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [bank, setBank] = useState<string | null>(null);

  // 프로필 정보 가져오기
  const fetchMyInfo = useCallback(async () => {
    try {
      const response = await getMyInfo();
      setCurrentProfileImage(response.result.profileImageUrl);
      setNickname(response.result.nickname);
      setAddress(response.result.address);
      setAccount(response.result.account);
      setBank(response.result.bank);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchMyInfo();
  }, [fetchMyInfo]);

  // 버튼으로 이미지 선택
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(previewUrl); // 미리보기용 URL 업데이트
      setImageFile(file); // 실제 파일 업데이트
      setCurrentProfileImage(previewUrl); // 프로필 수정 시 보여줄 이미지도 선택한 것으로 우선 변경
    }
  };

  // PresignedUrl 받기
  const handleGetPresignedUrl = useCallback(async () => {
    if (!imageFile) {
      return null;
    }
    try {
      const response = await postS3Image({
        fileName: imageFile.name,
        contentType: imageFile.type,
      });
      const presignedUrl = response.result.presignedUrl;
      return presignedUrl;
    } catch (error) {
      throw error;
    }
  }, [imageFile]);

  // S3에 직접 파일을 업로드
  const handleS3Upload = async (presignedUrl: string, file: File, contentType: string) => {
    try {
      await putS3Image({
        presignedUrl: presignedUrl,
        uploadFile: file,
        header: {
          'Content-Type': contentType,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  // 프로필 수정 API 호출
  const handleUserProfileUpdate = useCallback(
    async (finalImageUrl?: string) => {
      const imageUrlToUpdate = finalImageUrl ?? currentProfileImage ?? '';
      try {
        const profileData: EditMyInfoRequest = {
          nickname: nickname ?? '',
          profileImageUrl: imageUrlToUpdate,
          address: address ?? '',
          bank: bank ?? '',
          account: account ?? '',
        };
        await putMyInfo(profileData);
      } catch (error) {
        alert('프로필 정보 업데이트에 실패했습니다.');
        throw error;
      }
    },
    [nickname, currentProfileImage, address, bank, account, putMyInfo]
  );

  const handleSubmit = async () => {
    setIsUploading(true);
    let finalImageUrlForProfileUpdate = currentProfileImage; // 기본적으로 현재 프로필 이미지 URL 사용

    if (imageFile) {
      try {
        const presignedUrl = await handleGetPresignedUrl();
        if (!presignedUrl) {
          alert('이미지 업로드 준비에 실패했습니다. 다시 시도해주세요.');
          setIsUploading(false);
          return;
        }

        await handleS3Upload(presignedUrl, imageFile, imageFile.type);
        finalImageUrlForProfileUpdate = presignedUrl.split('?')[0]; // S3 업로드 성공 시 영구 URL 사용
        setCurrentProfileImage(finalImageUrlForProfileUpdate); // 업로드된 이미지로 상태 업데이트 (선택적)
      } catch (error) {
        alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
        setIsUploading(false);
        return;
      }
    }
    await handleUserProfileUpdate(
      finalImageUrlForProfileUpdate === null ? undefined : finalImageUrlForProfileUpdate
    );

    setIsUploading(false);
    navigate('/profileDetail');
  };

  // 입력 필드 변경
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value);
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAccount(e.target.value);
  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => setBank(e.target.value);

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
                  src={selectedImage ?? currentProfileImage ?? DefaultProfileImage}
                  alt="프로필 이미지"
                />
              </S.Image>
              <S.CameraIcon src={CameraIcon} alt="camera" />
            </S.ImageLabel>
          </S.ImageContainer>

          <S.TextContainer>
            <S.InputContainer>
              <S.Label htmlFor="nick">닉네임</S.Label>
              <S.Input
                id="nick"
                placeholder="닉네임을 입력하세요"
                value={nickname ?? ''}
                onChange={handleNicknameChange}
              />
            </S.InputContainer>
            <S.InputContainer>
              <S.Label htmlFor="addr">주소</S.Label>
              <S.Input
                id="addr"
                placeholder="주소를 입력하세요"
                value={address ?? ''}
                onChange={handleAddressChange}
              />
            </S.InputContainer>
            <S.BankContainer>
              <S.InputContainer>
                <S.Label htmlFor="bank">은행</S.Label>
                <S.Input
                  id="bank"
                  placeholder="은행명을 입력하세요"
                  value={bank ?? ''}
                  onChange={handleBankChange}
                />
              </S.InputContainer>
              <S.InputContainer>
                <S.Label htmlFor="acct">계좌</S.Label>
                <S.Input
                  id="acct"
                  placeholder="계좌를 입력하세요"
                  value={account ?? ''}
                  onChange={handleAccountChange}
                />
              </S.InputContainer>
            </S.BankContainer>
          </S.TextContainer>
        </S.InfoContainer>
        <Button
          text={isUploading ? '업로드 중...' : '수정하기'}
          onClick={handleSubmit}
          disabled={isUploading}
        />
      </S.ContentsContainer>
    </S.PageContainer>
  );
};

export default ProfileEditPage;
