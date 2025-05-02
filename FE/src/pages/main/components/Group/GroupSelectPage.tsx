import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './GroupSelectStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { SearchIcon } from '@/assets/assets';
import { artistList } from '@/mocks/artist';

interface GroupSelectPageProps {
  onGroupSelect: (groupId: number | null) => void;
  selectedAllGroup: number | null;
}

const GroupSelectPage = ({ onGroupSelect, selectedAllGroup }: GroupSelectPageProps) => {
  const navigate = useNavigate();
  const [tempSelectedGroup, setTempSelectedGroup] = useState<number | null>(selectedAllGroup);

  const handleGroupSelect = (groupId: number) => {
    setTempSelectedGroup(groupId);
  };

  const handleConfirm = () => {
    if (tempSelectedGroup) {
      onGroupSelect(tempSelectedGroup);
      navigate('/main', {
        replace: true,
        state: { selectedAllGroup: tempSelectedGroup },
      });
    }
  };

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton />
        <S.Title>그룹을 선택해주세요</S.Title>
        <S.SearchContainer>
          <S.SearchInput placeholder="그룹명을 검색해주세요" />
          <S.SearchIcon src={SearchIcon} />
        </S.SearchContainer>
        <S.GroupListContainer>
          {artistList.map((artist) => (
            <S.GroupInfo
              key={artist.groupId}
              onClick={() => handleGroupSelect(artist.groupId)}
              $isSelected={tempSelectedGroup === artist.groupId}
            >
              <S.GroupImage src={artist.image} />
              <S.GroupName>{artist.name}</S.GroupName>
            </S.GroupInfo>
          ))}
        </S.GroupListContainer>
      </S.ItemContainer>
      <Button text="선택하기" onClick={handleConfirm} disabled={!tempSelectedGroup} />
    </S.PageContainer>
  );
};

export default GroupSelectPage;
