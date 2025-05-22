import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import * as S from './MyGroupEditStyle';
import Button from '@/components/common/Button';
import BackButton from '@/components/common/BackButton';
import { SearchIcon } from '@/assets/assets';
import { useGroups } from '@/hooks/artist/query/useGroups';
import { Group } from '@/types/group';
import { useGroupSearch } from '@/hooks/search/useGroupSearch';
import { useToastStore } from '@/store/toastStore';

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
  const { showToast } = useToastStore();

  // 관심 그룹이 앞으로 오도록 정렬된 그룹 목록
  const sortedGroups = filteredGroups?.sort((a, b) => {
    if (a.interest && !b.interest) return -1;
    if (!a.interest && b.interest) return 1;
    return 0;
  });

  // 관심 그룹(멤버)이 1개 이상 선택됐는지 여부
  const hasInterestGroup = sortedGroups?.some((group) => group.interest);

  // 완료 버튼 핸들러 - 관심 멤버 없으면 토스트, 있으면 이동
  const handleComplete = useCallback(() => {
    if (!hasInterestGroup) {
      showToast('warning', '관심 멤버를 1명 이상 선택해주세요!');
      return;
    }
    navigate(fromPath);
  }, [navigate, fromPath, hasInterestGroup, showToast]);

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton
          fallbackPath="/profile"
          onClick={() => {
            if (!hasInterestGroup) {
              showToast('warning', '관심 멤버를 1명 이상 선택해주세요!');
              return;
            }
            navigate(fromPath);
          }}
        />
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
                  alt={group.groupDisplayName || ''}
                />
                <S.GroupName $isSelected={hasLikedMembers}>{group.groupDisplayName}</S.GroupName>
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
