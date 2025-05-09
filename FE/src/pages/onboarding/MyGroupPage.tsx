import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as S from './MyGroupStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { SearchIcon } from '@/assets/assets';
import { useGroupsAll } from '@/hooks/artist/query/useGroups';
import { Group } from '@/types/group';
import { useGroupSearch } from '@/hooks/search/useGroupSearch';
import { hasSelectedMembers } from '@/utils/storage';

const MyGroupPage = () => {
  const navigate = useNavigate();
  const { data: groupsData } = useGroupsAll();
  const [searchTerm, setSearchTerm] = useState('');

  const { filteredGroups } = useGroupSearch({
    groups: groupsData?.result,
    searchTerm,
  });

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
                <S.GroupName>{group.groupNameKo}</S.GroupName>
              </S.GroupInfo>
            );
          })}
        </S.GroupListContainer>
      </S.ItemContainer>
      <Button text="완료" onClick={() => navigate('/profile')} />
    </S.PageContainer>
  );
};

export default MyGroupPage;
