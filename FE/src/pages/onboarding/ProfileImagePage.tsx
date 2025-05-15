import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import * as S from './ProfileImageStyle';
import BackButton from './components/BackButton';
import Button from '@/components/common/Button';
import { CameraIcon } from '@/assets/assets';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { postS3Image, putS3Image } from '@/api/s3/s3Image';

const ProfileImagePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentProfileImage, setCurrentProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(previewUrl);
      setImageFile(file);
      setCurrentProfileImage(previewUrl);
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

  const handleNext = async () => {
    let finalImageUrl = currentProfileImage;

    if (imageFile) {
      try {
        const presignedUrl = await handleGetPresignedUrl();
        if (!presignedUrl) {
          alert('이미지 업로드 준비에 실패했습니다.');
          return;
        }
        await handleS3Upload(presignedUrl, imageFile, imageFile.type);
        finalImageUrl = presignedUrl.split('?')[0];
        setCurrentProfileImage(finalImageUrl);
      } catch (error) {
        alert('이미지 업로드 중 오류가 발생했습니다.');
        return;
      }
    }
    const prev = queryClient.getQueryData<{ profileImage?: string }>([QUERY_KEYS.ONBOARDING]) || {};
    queryClient.setQueryData([QUERY_KEYS.ONBOARDING], {
      ...prev,
      profileImage: finalImageUrl,
    });
    navigate('/group');
  };

  useEffect(() => {
    const prev = queryClient.getQueryData<{ profileImage?: string }>([QUERY_KEYS.ONBOARDING]) || {};
    if (prev.profileImage) {
      setSelectedImage(prev.profileImage);
    }
  }, []);

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton />
        <S.Title>프로필 이미지를 설정해주세요</S.Title>
        <S.ImageContainer>
          <S.ImageLabel>
            <S.ImageInput type="file" accept="image/*" onChange={handleImageUpload} />

            {/* 이미지 크기 조절이 가능하게 구현 */}
            <S.Image>
              {selectedImage ? (
                <S.UploadedImage src={selectedImage} alt="프로필 이미지" />
              ) : (
                <S.CameraIcon src={CameraIcon} alt="camera" />
              )}
            </S.Image>
          </S.ImageLabel>
        </S.ImageContainer>
      </S.ItemContainer>
      <Button text="다음" onClick={handleNext} disabled={!selectedImage} />
    </S.PageContainer>
  );
};

export default ProfileImagePage;
