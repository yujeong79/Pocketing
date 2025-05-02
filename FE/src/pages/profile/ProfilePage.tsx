import { useNavigate } from 'react-router-dom';

import Header from '@/components/common/Header';
import * as S from './ProfileStyle';
import { RightArrowIcon, DefaultProfileImage } from '@/assets/assets';
import { myInfo } from '@/mocks/myInfo';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header type="profile" hasBorder={false} />
      <S.PageContainer>
        <S.ProfileContainer>
          <S.ProfileImage src={myInfo.profileImageUrl ?? DefaultProfileImage} alt="프로필 이미지" />
          <S.ProfileInfoContainer>
            <S.NameContainer>
              <S.Name>{myInfo.nickname}</S.Name>
              <S.NameAdd>님</S.NameAdd>
            </S.NameContainer>
            <S.ProfileEditButton
              src={RightArrowIcon}
              alt="프로필 수정"
              onClick={() => navigate('/profileDetail')}
            />
          </S.ProfileInfoContainer>
        </S.ProfileContainer>
      </S.PageContainer>
    </>
  );
};

export default ProfilePage;
