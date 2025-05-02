import Header from '@/components/common/Header.tsx';
import GroupImageList from '@/pages/main/components/Group/GroupImageList';
import MemberChipList from '@/pages/main/components/MemberChip/MemberChipList';
import PhotoCardList from '@/pages/main/components/PhotoCardList';
import AlbumChip from '@/pages/main/components/Album/AlbumChip';
import AlbumModal from '@/pages/main/components/Album/AlbumModal';
import { artistList } from '@/mocks/artist';
import { photocardListMock } from '@/mocks/photocard-list';
import { useState, useMemo } from 'react';
import { SelectedMemberText, MainContainer, FilterContainer } from './MainPageStyle';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedAllGroup, setSelectedAllGroup] = useState<number | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const location = useLocation();

  // location.state에서 선택된 그룹 정보를 가져옴
  useMemo(() => {
    if (location.state?.selectedAllGroup) {
      setSelectedAllGroup(location.state.selectedAllGroup);
    }
  }, [location.state]);

  const currentMembers = useMemo(() => {
    if (selectedGroupId === null && selectedAllGroup === null) {
      return [];
    }
    const groupId = selectedGroupId || selectedAllGroup;
    const selectedGroup = artistList.find((group) => group.groupId === groupId);
    return selectedGroup ? selectedGroup.members : [];
  }, [selectedGroupId, selectedAllGroup]);

  const selectedGroup = useMemo(() => {
    const groupId = selectedGroupId || selectedAllGroup;
    return artistList.find((group) => group.groupId === groupId);
  }, [selectedGroupId, selectedAllGroup]);

  const albums = useMemo(() => {
    const { content } = photocardListMock.result;
    const filteredContent = content.filter((card) => {
      const groupId = selectedGroupId || selectedAllGroup;
      if (!groupId) return true;
      if (selectedMember) {
        return card.memberName === selectedMember;
      }
      return card.groupNameKo === selectedGroup?.name;
    });

    return [...new Set(filteredContent.map((card) => card.albumTitle))];
  }, [selectedGroupId, selectedAllGroup, selectedMember, selectedGroup]);

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
            setSelectedAllGroup(null);
          }}
          selectedAllGroup={selectedAllGroup}
          onSelectAllGroup={setSelectedAllGroup}
        />
        {(selectedGroupId || selectedAllGroup) && (
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
          selectedGroupId={selectedGroupId || selectedAllGroup}
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
