import { useEffect, useState } from 'react';

import Header from '@/components/common/Header';
import * as S from './ProfileDetailStyle';
import { AddressIcon, AccountIcon } from '@/assets/assets';
import { DefaultProfileImage } from '@/assets/assets.ts';
import { getKakaoLogout } from '@/api/auth/kakaoLogout';
import { useProfile } from '@/hooks/user/useProfile';
import { useGlobalStore } from '@/store/globalStore';

const ProfileDetailPage = () => {
  const { myProfile, fetchProfile } = useProfile();
  const { isProfileLoading, setIsProfileLoading } = useGlobalStore();
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  const handleLogout = () => {
    const userStr = localStorage.getItem('user');
    let oauthProvider = '';

    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        oauthProvider = userData.oauthProvider;
      } catch (error) {
        console.error('사용자 정보 파싱 실패:', error);
      }
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('main-page-store');

    if (oauthProvider === 'kakao') {
      window.location.href = getKakaoLogout();
    } else {
      window.location.href = '/signin';
    }
  };

  useEffect(() => {
    if (!isProfileLoading) {
      fetchProfile();
      setImageTimestamp(Date.now());
      setIsProfileLoading(true);
    }
  }, [fetchProfile, isProfileLoading, setIsProfileLoading]);

  return (
    <S.PageContainer>
      <Header type="profileDetail" hasBorder={true} />
      <S.ContentsContainer>
        <S.ProfileInfoContainer>
          <S.ProfileImageContainer>
            <S.ProfileImage
              src={`${myProfile.profileImageUrl ?? DefaultProfileImage}?t=${imageTimestamp}`}
              alt="프로필 이미지"
            />
            <S.ProfileNickname>{myProfile.nickname}</S.ProfileNickname>
          </S.ProfileImageContainer>
          <S.AddressContainer>
            <S.AddressTitleContainer>
              <S.AddressIcon src={AddressIcon} alt="주소 아이콘" />
              <S.AddressTitle>주소</S.AddressTitle>
            </S.AddressTitleContainer>
            <S.Address>
              {myProfile.address ? myProfile.address : '아직 주소 정보가 없어요'}
            </S.Address>
          </S.AddressContainer>
          <S.AccountContainer>
            <S.AccountTitleContainer>
              <S.AccountIcon src={AccountIcon} alt="계좌 아이콘" />
              <S.AccountTitle>계좌정보</S.AccountTitle>
            </S.AccountTitleContainer>
            <S.Account>
              {myProfile.account ? myProfile.account : '아직 계좌 정보가 없어요'}
            </S.Account>
            <S.AccountBank>{myProfile.bank ? myProfile.bank : null}</S.AccountBank>
          </S.AccountContainer>
        </S.ProfileInfoContainer>
        <S.LeaveContainer>
          <S.Logout onClick={handleLogout}>로그아웃</S.Logout>
          <S.DeleteAccount>회원탈퇴</S.DeleteAccount>
        </S.LeaveContainer>
      </S.ContentsContainer>
    </S.PageContainer>
  );
};

export default ProfileDetailPage;
