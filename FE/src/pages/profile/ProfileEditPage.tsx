import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './ProfileEditStyle';
import Header from '@/components/common/Header';
import { DefaultProfileImage, CameraIcon } from '@/assets/assets';
import { myInfo } from '@/mocks/myInfo';
import Button from '@/components/common/Button';

const ProfileEditPage = () => {
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
      <Header type="profileEdit" hasBorder={true} />
      <S.ContentsContainer>
        <S.InfoContainer>
          <S.ImageContainer>
            <S.ImageLabel>
              <S.ImageInput type="file" accept="image/*" onChange={handleImageUpload} />

              {/* 이미지 크기 조절이 가능하게 구현 */}
              <S.Image>
                {selectedImage ? (
                  <S.UploadedImage src={selectedImage} alt="프로필 이미지" />
                ) : (
                  <S.UploadedImage
                    src={myInfo.profileImageUrl ?? DefaultProfileImage}
                    alt="프로필 이미지"
                  />
                )}
              </S.Image>
              <S.CameraIcon src={CameraIcon} alt="camera" />
            </S.ImageLabel>
          </S.ImageContainer>
          <S.TextContainer>
            <S.NicknameContainer>
              <S.NicknameTitle>닉네임</S.NicknameTitle>
              <S.InputContainer>
                <S.Input placeholder={myInfo.nickname} />
              </S.InputContainer>
            </S.NicknameContainer>
            <S.AddressContainer>
              <S.AddressTitle>주소</S.AddressTitle>
              <S.InputContainer>
                <S.Input placeholder={myInfo.address} />
              </S.InputContainer>
            </S.AddressContainer>
            <S.AccountContainer>
              <S.AccountTitle>계좌</S.AccountTitle>
              <S.InputContainer>
                <S.Input placeholder={myInfo.account} />
              </S.InputContainer>
            </S.AccountContainer>
          </S.TextContainer>
        </S.InfoContainer>
        <Button text="수정하기" onClick={() => navigate('/profileDetail')} />
      </S.ContentsContainer>
    </S.PageContainer>
  );
};

export default ProfileEditPage;
