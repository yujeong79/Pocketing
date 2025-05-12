import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';

import * as S from './MyGroupEditStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { SearchIcon } from '@/assets/assets';
import { useGroupsAll } from '@/hooks/artist/query/useGroups';
import { Group } from '@/types/group';
import { useGroupSearch } from '@/hooks/search/useGroupSearch';
import { useLikedMembersStore } from '@/store/likedMembers';
import { useUpdateLikedMembers } from '@/hooks/user/mutation/useLike';
import { useLikedMembers } from '@/hooks/user/query/useLike';
import { UserLikedMember, LikedGroupListRequest } from '@/types/user';
import { AxiosError } from 'axios';

const LikedMembersLoader = ({ groupId }: { groupId: number }) => {
  const { updateGroupMembers } = useLikedMembersStore();
  const { data } = useLikedMembers(groupId);

  useEffect(() => {
    if (data?.isSuccess && Array.isArray(data.result)) {
      const memberIds = data.result
        .filter((item): item is UserLikedMember => 'memberId' in item)
        .map((member) => member.memberId);

      if (memberIds.length > 0) {
        updateGroupMembers(groupId, memberIds);
      }
    }
  }, [data, groupId, updateGroupMembers]);

  return null;
};

const MyGroupEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from || '/profile';

  const { data: groupsData } = useGroupsAll();
  const [searchTerm, setSearchTerm] = useState('');
  const { likedInfo, hasSelectedMembers } = useLikedMembersStore();
  const updateLikedMembersMutation = useUpdateLikedMembers();

  const { filteredGroups } = useGroupSearch({
    groups: groupsData?.result,
    searchTerm,
  });

  // 완료 버튼 핸들러
  const handleComplete = useCallback(() => {
    const selectedGroups = likedInfo.likedGroupList.filter(
      (group) => group.likedMemberList.length > 0
    );

    if (selectedGroups.length === 0) {
      console.log('선택된 멤버가 없습니다.');
      return;
    }

    // API 요청 데이터 로깅
    console.log('Selected groups:', selectedGroups);

    const requestData: LikedGroupListRequest = {
      likedGroupList: selectedGroups.map((group) => ({
        groupId: group.groupId,
        likedMemberList: group.likedMemberList,
      })),
    };

    // 요청 데이터 로깅
    console.log('Request data:', requestData);

    updateLikedMembersMutation.mutate(requestData, {
      onSuccess: (response) => {
        console.log('API 응답:', response);
        if (response.isSuccess) {
          console.log('관심 멤버 업데이트 성공');
          navigate(fromPath);
        } else {
          console.error('API 응답 실패:', response.message);
        }
      },
      onError: (error: Error) => {
        console.error('API 에러 상세:', error);
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          // 401 에러는 axiosInstance에서 처리
          console.log('인증 에러 - 토큰 갱신 시도');
        } else {
          console.error('API 호출 실패:', axiosError.response?.data);
        }
      },
    });
  }, [updateLikedMembersMutation, likedInfo, navigate, fromPath]);

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
          {groupsData?.result?.map((group) => (
            <LikedMembersLoader key={group.groupId} groupId={group.groupId} />
          ))}
          {filteredGroups?.map((group: Group) => {
            const isSelected = hasSelectedMembers(group.groupId);
            return (
              <S.GroupInfo
                key={group.groupId}
                $isSelected={isSelected}
                onClick={() =>
                  navigate(`/myMemberEdit/${group.groupId}`, {
                    state: { from: fromPath },
                  })
                }
              >
                <S.GroupImage src={group.groupImageUrl} $isSelected={isSelected} />
                <S.GroupName>{group.groupNameKo}</S.GroupName>
              </S.GroupInfo>
            );
          })}
        </S.GroupListContainer>
      </S.ItemContainer>
      <Button
        text="완료"
        onClick={handleComplete}
        disabled={!likedInfo.likedGroupList.some((group) => group.likedMemberList.length > 0)}
      />
    </S.PageContainer>
  );
};

export default MyGroupEditPage;
