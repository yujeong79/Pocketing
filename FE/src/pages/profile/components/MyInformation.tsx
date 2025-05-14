import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import * as S from './MyInformationStyle';
import { DefaultProfileImage, RightArrowIcon } from '@/assets/assets';
import { getMyInfo } from '@/api/user/myInfo';

const MyInformation = () => {
  const [myImage, setMyImage] = useState<string | null>(null);
  const [myNickname, setMyNickname] = useState('');
  const navigate = useNavigate();

  const handleGetMyInfo = useCallback(async () => {
    try {
      const response = await getMyInfo();
      setMyImage(response.result.profileImageUrl);
      setMyNickname(response.result.nickname);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleGetMyInfo();
  }, []);

  return (
    <S.ProfileContainer>
      <S.ProfileImage src={myImage ?? DefaultProfileImage} alt="프로필 이미지" />
      <S.ProfileInfoContainer>
        <S.NameContainer>
          <S.Name>{myNickname}</S.Name>
          <S.NameAdd>님</S.NameAdd>
        </S.NameContainer>
        <S.RightArrowButton
          src={RightArrowIcon}
          alt="프로필 수정"
          onClick={() => navigate('/profileDetail')}
        />
      </S.ProfileInfoContainer>
    </S.ProfileContainer>
  );
};

export default MyInformation;
