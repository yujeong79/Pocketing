import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import * as S from './MyGroupEditStyle';
import Button from '@/components/common/Button';
import BackButton from '@/components/common/BackButton';
import { SearchIcon } from '@/assets/assets';
import { useGroups } from '@/hooks/artist/query/useGroups';
import { Group } from '@/types/group';
import { useGroupSearch } from '@/hooks/search/useGroupSearch';

const MyGroupEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from || '/profile';

  const { data: groupsData } = useGroups();
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredGroups } = useGroupSearch({
    groups: groupsData?.result,
    searchTerm,
  });

  // 관심 그룹이 앞으로 오도록 정렬된 그룹 목록
  const sortedGroups = filteredGroups?.sort((a, b) => {
    if (a.interest && !b.interest) return -1;
    if (!a.interest && b.interest) return 1;
    return 0;
  });

  // 완료 버튼 핸들러 - 단순히 메인 페이지로 이동
  const handleComplete = useCallback(() => {
    navigate(fromPath);
  }, [navigate, fromPath]);

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton fallbackPath="/profile" />
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
          {sortedGroups?.map((group: Group) => {
            const hasLikedMembers = group.interest;
            return (
              <S.GroupInfo
                key={group.groupId}
                $isSelected={hasLikedMembers}
                onClick={() =>
                  navigate(`/myMemberEdit/${group.groupId}`, {
                    state: { from: fromPath },
                  })
                }
              >
                <S.GroupImage
                  src={group.groupImageUrl}
                  $isSelected={hasLikedMembers}
                  alt={group.groupNameKo}
                />
                <S.GroupName $isSelected={hasLikedMembers}>{group.groupNameKo}</S.GroupName>
              </S.GroupInfo>
            );
          })}
        </S.GroupListContainer>
      </S.ItemContainer>
      <Button text="완료" onClick={handleComplete} />
    </S.PageContainer>
  );
};

export default MyGroupEditPage;
