import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './ProfileEditStyle';
import Header from '@/components/common/Header';
import { DefaultProfileImage, CameraIcon } from '@/assets/assets';
import { myInfo } from '@/mocks/myInfo';
import Button from '@/components/common/Button';

const ProfileEditPage: React.FC = () => {
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
      <Header type="profileEdit" hasBorder />
      <S.ContentsContainer>
        <S.InfoContainer>
          <S.ImageContainer>
            <S.ImageLabel htmlFor="avatar-input">
              <S.ImageInput
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <S.Image>
                <S.UploadedImage
                  src={
                    selectedImage ?? myInfo.profileImageUrl ?? DefaultProfileImage
                  }
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
                defaultValue={myInfo.nickname}
              />
            </S.InputContainer>
            <S.InputContainer>
              <S.Label htmlFor="addr">주소</S.Label>
              <S.Input
                id="addr"
                placeholder="주소를 입력하세요"
                defaultValue={myInfo.address}
              />
            </S.InputContainer>
            <S.InputContainer>
              <S.Label htmlFor="acct">계좌</S.Label>
              <S.Input
                id="acct"
                placeholder="계좌를 입력하세요"
                defaultValue={myInfo.account}
              />
            </S.InputContainer>
          </S.TextContainer>
        </S.InfoContainer>
        <Button text="수정하기" onClick={() => navigate('/profileDetail')} />
      </S.ContentsContainer>
    </S.PageContainer>
  );
};

export default ProfileEditPage;