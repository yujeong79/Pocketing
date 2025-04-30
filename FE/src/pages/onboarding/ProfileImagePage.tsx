import { useNavigate } from 'react-router-dom';

import * as S from './ProfileImageStyle';

import BackButton from './components/BackButton';
import Button from '@/components/common/Button';
import { CameraIcon } from '@/assets/assets';
import { useState } from 'react';

const ProfileImagePage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

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
      <Button text="다음" onClick={() => navigate('/group')} />
    </S.PageContainer>
  );
};

export default ProfileImagePage;
