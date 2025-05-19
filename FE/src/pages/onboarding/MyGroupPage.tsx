import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import * as S from './MyGroupStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { SearchIcon } from '@/assets/assets';
import { useGroupsAll } from '@/hooks/artist/query/useGroups';
import { Group } from '@/types/group';
import { useGroupSearch } from '@/hooks/search/useGroupSearch';
import { useLikedMembersStore } from '@/store/likedMembers';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { createSignUp } from '@/api/signUp';
import type { SignUpRequest } from '@/types/signUp';

const MyGroupPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: groupsData } = useGroupsAll();
  const [searchTerm, setSearchTerm] = useState('');
  const { hasSelectedMembers, likedInfo } = useLikedMembersStore();

  const { filteredGroups } = useGroupSearch({
    groups: groupsData?.result,
    searchTerm,
  });

  const handleComplete = useCallback(async () => {
    try {
      // 1. OAuth 정보 확인
      const oauthData = queryClient.getQueryData<{
        oauthProvider: string;
        providerId: string;
      }>([QUERY_KEYS.OAUTH]);

      // 2. 온보딩 데이터 확인
      const onboardingData = queryClient.getQueryData<{
        nickname: string;
        profileImage: string;
      }>([QUERY_KEYS.ONBOARDING]);

      if (!onboardingData || !oauthData) {
        console.error('필요한 회원가입 정보가 없습니다.');
        navigate('/signin');
        return;
      }

      const signUpData: SignUpRequest = {
        oauthProvider: oauthData.oauthProvider,
        providerId: oauthData.providerId,
        nickname: onboardingData.nickname,
        profileImageUrl: onboardingData.profileImage,
        likedInfo,
      };

      const response = await createSignUp(signUpData);

      if (response.isSuccess) {
        localStorage.setItem('accessToken', response.result.accessToken);
        navigate('/signup/complete');
      } else {
        if (response.message.includes('이미 사용 중인 닉네임입니다')) {
          alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해주세요.');
          navigate('/signup/nickname');
          return;
        }
        navigate('/signin');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message;
      if (errorMessage?.includes('이미 사용 중인 닉네임입니다')) {
        alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해주세요.');
        navigate('/signup/nickname');
        return;
      }
      navigate('/signin');
    }
  }, [likedInfo, navigate, queryClient]);

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton />
        <S.Title>관심 그룹을 선택해주세요</S.Title>
        <S.SearchContainer>
          <S.SearchInput
            placeholder="그룹명을 검색해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <S.SearchIcon src={SearchIcon} />
        </S.SearchContainer>
        <S.GroupListContainer>
          {filteredGroups.map((group: Group) => {
            const hasSelected = hasSelectedMembers(group.groupId);
            return (
              <S.GroupInfo
                key={group.groupId}
                onClick={() => navigate(`/member/${group.groupId}`)}
                $isSelected={hasSelected}
              >
                <S.GroupImage src={group.groupImageUrl} $isSelected={hasSelected} />
                <S.GroupName>{group.groupDisplayName}</S.GroupName>
              </S.GroupInfo>
            );
          })}
        </S.GroupListContainer>
      </S.ItemContainer>
      <Button text="완료" onClick={handleComplete} />
    </S.PageContainer>
  );
};

export default MyGroupPage;
