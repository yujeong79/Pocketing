import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import * as S from './MyGroupEditStyle';
import Button from '@/components/common/Button';
import { SearchIcon } from '@/assets/assets';
import { useGroupsAll } from '@/hooks/artist/query/useGroups';
import { Group } from '@/types/group';
import { useGroupSearch } from '@/hooks/search/useGroupSearch';
import BackButton from '@/pages/onboarding/components/BackButton';

const MyGroupEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from || '/profile';

  const { data: groupsData } = useGroupsAll();
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredGroups } = useGroupSearch({
    groups: groupsData?.result,
    searchTerm,
  });

  // 완료 버튼 핸들러 - 단순히 메인 페이지로 이동
  const handleComplete = useCallback(() => {
    navigate(fromPath);
  }, [navigate, fromPath]);

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
          {filteredGroups?.map((group: Group) => {
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
