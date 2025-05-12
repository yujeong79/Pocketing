import { useNavigate, useLocation } from 'react-router-dom';

import * as S from './MyGroupEditStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { SearchIcon } from '@/assets/assets';
import { useEffect, useState } from 'react';
import { useLikedMembersStore } from '@/store/likedMembers';
import { useGroupSearch } from '@/hooks/search/useGroupSearch';
import { useGroups } from '@/hooks/artist/query/useGroups';
import { useLikedGroups } from '@/hooks/user/query/useLike';
import { useUpdateLikedMembers } from '@/hooks/user/mutation/useLike';
import { UserLikedGroup } from '@/types/user';

const MyGroupEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from || '/profile';
  // API 호출
  const { data: groupsData } = useGroups();
  const { data: likedGroupsData } = useLikedGroups();
  const { mutate: updateLikedMembers } = useUpdateLikedMembers();

  // 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  const { getSelectedMembers } = useLikedMembersStore();
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);

  // 기존 관심 그룹 정보 로드
  useEffect(() => {
    if (likedGroupsData?.result) {
      const likedGroupIds = likedGroupsData.result
        .filter((item): item is UserLikedGroup => 'groupId' in item)
        .map((group) => group.groupId);
      setSelectedGroups(likedGroupIds);
    }
  }, [likedGroupsData]);

  const { filteredGroups } = useGroupSearch({
    groups: groupsData?.result,
    searchTerm,
  });

  // 그룹 선택 핸들러
  const handleComplete = () => {
    const likedGroupList = {
      groupId: selectedGroups[0],
      likedMemberList: getSelectedMembers(selectedGroups[0]).map((memberId) => ({
        memberId,
      })),
    };

    updateLikedMembers(likedGroupList, {
      onSuccess: () => {
        navigate(fromPath);
      },
      onError: (error) => {
        console.error('관심 그룹 업데이트 실패', error);
      },
    });
  };

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
          {filteredGroups.map((group) => (
            <S.GroupInfo
              key={group.groupId}
              onClick={() =>
                navigate(`/myMemberEdit/${group.groupId}`, {
                  state: { from: fromPath },
                })
              }
            >
              <S.GroupImage src={group.groupImageUrl} />
              <S.GroupName>{group.groupNameKo}</S.GroupName>
            </S.GroupInfo>
          ))}
        </S.GroupListContainer>
      </S.ItemContainer>
      <Button text="완료" onClick={handleComplete} />
    </S.PageContainer>
  );
};

export default MyGroupEditPage;
