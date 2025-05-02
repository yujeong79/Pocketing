import Header from '@/components/common/Header.tsx';
import GroupImageList from './components/GroupImage/GroupImageList';
import MemberChipList from './components/MemberChip/MemberChipList';
import PhotoCardList from './components/PhotoCard/PhotoCardList';
import AlbumChip from './components/AlbumChip/AlbumChip';
import AlbumModal from './components/AlbumModal/AlbumModal';
import { artistList } from '@/mocks/artist';
import { photocardListMock } from '@/mocks/photocard-list';
import { useState, useMemo } from 'react';
import { SelectedMemberText, MainContainer, FilterContainer } from './MainPageStyle';

const MainPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  const currentMembers = useMemo(() => {
    if (selectedGroupId === null) {
      return [];
    }
    const selectedGroup = artistList.find((group) => group.groupId === selectedGroupId);
    return selectedGroup ? selectedGroup.members : [];
  }, [selectedGroupId]);

  const selectedGroup = useMemo(() => {
    return artistList.find((group) => group.groupId === selectedGroupId);
  }, [selectedGroupId]);

  const albums = useMemo(() => {
    const { content } = photocardListMock.result;
    const filteredContent = content.filter((card) => {
      if (!selectedGroupId) return true;
      if (selectedMember) {
        return card.memberName === selectedMember;
      }
      return card.groupNameKo === selectedGroup?.name;
    });

    return [...new Set(filteredContent.map((card) => card.albumTitle))];
  }, [selectedGroupId, selectedMember, selectedGroup]);

  const handleAlbumSelect = (albumTitle: string | null) => {
    setSelectedAlbum(albumTitle);
    setIsAlbumModalOpen(false);
  };

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
            setSelectedAlbum(null);
          }}
        />
        {selectedGroupId && (
          <MemberChipList
            members={currentMembers}
            selectedMember={selectedMember}
            onSelectMember={(member) => {
              setSelectedMember(member);
              setSelectedAlbum(null);
            }}
          />
        )}
        <FilterContainer>
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
          <AlbumChip
            isSelected={selectedAlbum !== null}
            onClick={() => setIsAlbumModalOpen(true)}
          />
        </FilterContainer>
        <PhotoCardList
          selectedGroupId={selectedGroupId}
          selectedMember={selectedMember}
          selectedAlbum={selectedAlbum}
        />
        <AlbumModal
          isOpen={isAlbumModalOpen}
          onClose={() => setIsAlbumModalOpen(false)}
          onSelectAlbum={handleAlbumSelect}
          albums={albums}
          selectedAlbum={selectedAlbum}
        />
      </MainContainer>
    </>
  );
};

export default MainPage;
