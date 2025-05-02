import { useNavigate } from 'react-router-dom';

import Header from '@/components/common/Header';
import * as S from './ProfileDetailStyle';
import { myInfo } from '@/mocks/myInfo';
import { AddressIcon, AccountIcon } from '@/assets/assets';
import { DefaultProfileImage } from '@/assets/assets.ts';

const ProfileDetailPage = () => {
  const navigate = useNavigate();

  return (
    <S.PageContainer>
      <Header type="profileDetail" hasBorder={true} onBack={() => navigate(-1)} />
      <S.ContentsContainer>
        <S.ProfileInfoContainer>
          <S.ProfileImageContainer>
            <S.ProfileImage
              src={myInfo.profileImageUrl ?? DefaultProfileImage}
              alt="프로필 이미지"
            />
            <S.ProfileNickname>{myInfo.nickname}</S.ProfileNickname>
          </S.ProfileImageContainer>
          <S.AddressContainer>
            <S.AddressTitleContainer>
              <S.AddressIcon src={AddressIcon} alt="주소 아이콘" />
              <S.AddressTitle>주소</S.AddressTitle>
            </S.AddressTitleContainer>
            <S.Address>{myInfo.address}</S.Address>
          </S.AddressContainer>
          <S.AccountContainer>
            <S.AccountTitleContainer>
              <S.AccountIcon src={AccountIcon} alt="계좌 아이콘" />
              <S.AccountTitle>계좌정보</S.AccountTitle>
            </S.AccountTitleContainer>
            <S.Account>{myInfo.account}</S.Account>
            <S.AccountBank>{myInfo.bank}</S.AccountBank>
          </S.AccountContainer>
        </S.ProfileInfoContainer>
        <S.LeaveContainer>
          <S.Logout>로그아웃</S.Logout>
          <S.DeleteAccount>회원탈퇴</S.DeleteAccount>
        </S.LeaveContainer>
      </S.ContentsContainer>
    </S.PageContainer>
  );
};

export default ProfileDetailPage;
