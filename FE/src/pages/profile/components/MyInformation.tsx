import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './MyInformationStyle';
import { DefaultProfileImage, RightArrowIcon } from '@/assets/assets';
import { useProfile } from '@/hooks/user/useProfile';
import { useGlobalStore } from '@/store/globalStore';

const MyInformation = () => {
  const navigate = useNavigate();
  const { myProfile, fetchProfile } = useProfile();
  const { isProfileLoading, setIsProfileLoading } = useGlobalStore();
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  useEffect(() => {
    if (!isProfileLoading) {
      fetchProfile();
      setImageTimestamp(Date.now());
      setIsProfileLoading(true);
    }
  }, [fetchProfile, isProfileLoading, setIsProfileLoading]);

  return (
    <S.ProfileContainer>
      <S.ProfileImage
        src={`${myProfile.profileImageUrl ?? DefaultProfileImage}?t=${imageTimestamp}`}
        alt="프로필 이미지"
      />
      <S.ProfileInfoContainer>
        <S.NameContainer>
          <S.Name>{myProfile.nickname}</S.Name>
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
