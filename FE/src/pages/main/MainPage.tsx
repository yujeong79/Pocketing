import Header from '@/components/common/Header.tsx';
import GroupImageList from './components/GroupImage/GroupImageList';
import MemberChipList from './components/MemberChip/MemberChipList';
import { artistList } from '@/mocks/artist';
import { useState, useMemo } from 'react';
import { SelectedMemberText, MainContainer } from './MainPageStyle';

const MainPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const currentMembers = useMemo(() => {
    if (selectedGroupId === null) {
      return artistList.flatMap((group) => group.members);
    }
    const selectedGroup = artistList.find((group) => group.groupId === selectedGroupId);
    return selectedGroup ? selectedGroup.members : [];
  }, [selectedGroupId]);

  const selectedGroup = useMemo(() => {
    return artistList.find((group) => group.groupId === selectedGroupId);
  }, [selectedGroupId]);

  return (
    <>
      <Header type="main" />
      <MainContainer>
        <GroupImageList
          groups={artistList}
          selectedId={selectedGroupId}
          onSelectGroup={(id) => {
            setSelectedGroupId(id);
            setSelectedMember(null);
          }}
        />
        <MemberChipList
          members={currentMembers}
          selectedMember={selectedMember}
          onSelectMember={setSelectedMember}
        />
        {selectedMember && (
          <SelectedMemberText>
            <span>{selectedMember}</span>의 포토카드
          </SelectedMemberText>
        )}
        {!selectedMember && selectedGroup && (
          <SelectedMemberText>
            <span>{selectedGroup.name}</span>의 포토카드
          </SelectedMemberText>
        )}
      </MainContainer>
    </>
  );
};

export default MainPage;
