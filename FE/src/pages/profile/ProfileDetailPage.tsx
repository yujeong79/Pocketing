import Header from '@/components/common/Header';
import * as S from './ProfileDetailStyle';
import { useCallback, useEffect, useState } from 'react';
import { AddressIcon, AccountIcon } from '@/assets/assets';
import { DefaultProfileImage } from '@/assets/assets.ts';
import { getMyInfo } from '@/api/user/myInfo';

const ProfileDetailPage = () => {
  const [myImage, setMyImage] = useState<string | null>(null);
  const [myNickname, setMyNickname] = useState<string | null>(null);
  const [myAddress, setMyAddress] = useState<string | null>(null);
  const [myAccount, setMyAccount] = useState<string | null>(null);
  const [myBank, setMyBank] = useState<string | null>(null);

  const handleGetMyInfo = useCallback(async () => {
    try {
      const response = await getMyInfo();
      setMyImage(response.result.profileImageUrl);
      setMyNickname(response.result.nickname);
      setMyAddress(response.result.address);
      setMyAccount(response.result.account);
      setMyBank(response.result.bank);
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  useEffect(() => {
    handleGetMyInfo();
  }, [handleGetMyInfo]);

  return (
    <S.PageContainer>
      <Header type="profileDetail" hasBorder={true} />
      <S.ContentsContainer>
        <S.ProfileInfoContainer>
          <S.ProfileImageContainer>
            <S.ProfileImage src={myImage ?? DefaultProfileImage} alt="프로필 이미지" />
            <S.ProfileNickname>{myNickname}</S.ProfileNickname>
          </S.ProfileImageContainer>
          <S.AddressContainer>
            <S.AddressTitleContainer>
              <S.AddressIcon src={AddressIcon} alt="주소 아이콘" />
              <S.AddressTitle>주소</S.AddressTitle>
            </S.AddressTitleContainer>
            <S.Address>{myAddress ? myAddress : '아직 주소 정보가 없어요'}</S.Address>
          </S.AddressContainer>
          <S.AccountContainer>
            <S.AccountTitleContainer>
              <S.AccountIcon src={AccountIcon} alt="계좌 아이콘" />
              <S.AccountTitle>계좌정보</S.AccountTitle>
            </S.AccountTitleContainer>
            <S.Account>{myAccount ? myAccount : '아직 계좌 정보가 없어요'}</S.Account>
            <S.AccountBank>{myBank ? myBank : null}</S.AccountBank>
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
