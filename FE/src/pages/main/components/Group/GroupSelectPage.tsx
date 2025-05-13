import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as S from './GroupSelectStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { SearchIcon } from '@/assets/assets';
import { useGroups } from '@/hooks/artist/query/useGroups';
import { useGroupSearch } from '@/hooks/search/useGroupSearch';
import { Group } from '@/types/group';

interface GroupSelectPageProps {
  onGroupSelect: (groupId: number) => void;
  selectedAllGroup: number | null;
  selectedGroupData?: Group | null;
}

const GroupSelectPage = ({ onGroupSelect, selectedAllGroup }: GroupSelectPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: groupsData } = useGroups();
  // 이전 선택 상태를 초기값으로 사용
  const [tempSelectedGroup, setTempSelectedGroup] = useState<number | null>(
    location.state?.previousSelectedAllGroup || selectedAllGroup
  );

  // 검색
  const [searchTerm, setSearchTerm] = useState('');

  const { filteredGroups } = useGroupSearch({
    groups: groupsData?.result,
    searchTerm,
  });

  const handleGroupSelect = (groupId: number) => {
    setTempSelectedGroup(groupId);
  };

  const handleConfirm = () => {
    if (tempSelectedGroup && groupsData?.result) {
      const selectedGroupData = groupsData?.result.find(
        (group) => group.groupId === tempSelectedGroup
      );
      onGroupSelect(tempSelectedGroup);
      navigate('/main', {
        replace: true,
        state: {
          selectedAllGroup: tempSelectedGroup,
          selectedGroupData: selectedGroupData, // 그룹 전체 정보 전달
        },
      });
    }
  };

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton />
        <S.Title>그룹을 선택해주세요</S.Title>
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
              onClick={() => handleGroupSelect(group.groupId)}
              $isSelected={tempSelectedGroup === group.groupId}
            >
              <S.GroupImage src={group.groupImageUrl} />
              <S.GroupName>{group.groupNameKo}</S.GroupName>
            </S.GroupInfo>
          ))}
        </S.GroupListContainer>
      </S.ItemContainer>
      <Button text="선택하기" onClick={handleConfirm} disabled={!tempSelectedGroup} />
    </S.PageContainer>
  );
};

export default GroupSelectPage;
