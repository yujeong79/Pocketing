import { useNavigate } from 'react-router-dom';

import * as S from './MyInformationStyle';
import { myInfo } from '@/mocks/myInfo';
import { DefaultProfileImage, RightArrowIcon } from '@/assets/assets';

const MyInformation = () => {
  const navigate = useNavigate();
  return (
    <S.ProfileContainer>
      <S.ProfileImage src={myInfo.profileImageUrl ?? DefaultProfileImage} alt="프로필 이미지" />
      <S.ProfileInfoContainer>
        <S.NameContainer>
          <S.Name>{myInfo.nickname}</S.Name>
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
