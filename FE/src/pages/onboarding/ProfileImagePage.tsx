import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import * as S from './ProfileImageStyle';
import BackButton from './components/BackButton';
import Button from '@/components/common/Button';
import { CameraIcon } from '@/assets/assets';
import { QUERY_KEYS } from '@/constants/queryKeys';

const ProfileImagePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleNext = () => {
    const prev = queryClient.getQueryData<{ profileImage?: string }>([QUERY_KEYS.ONBOARDING]) || {};
    queryClient.setQueryData([QUERY_KEYS.ONBOARDING], {
      ...prev,
      profileImage: selectedImage,
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
