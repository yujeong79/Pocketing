import Header from '@/components/common/Header.tsx';
import GroupImageList from '@/pages/main/components/Group/GroupImageList';
import MemberChipList from '@/pages/main/components/Chip/MemberChipList';
import PhotoCardList from '@/pages/main/components/PhotoCard/PhotoCardList';
import AlbumChip from '@/pages/main/components/Album/AlbumChip';
import AlbumModal from '@/pages/main/components/Album/AlbumModal';
import { useState, useEffect } from 'react';
import { SelectedMemberText, MainContainer, FilterContainer } from './MainPageStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMembers } from '@/hooks/artist/query/useMembers';
import { Group } from '@/types/group';

const MainPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [selectedAllGroup, setSelectedAllGroup] = useState<number | null>(null);
  const [selectedGroupData, setSelectedGroupData] = useState<Group | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // location.state에서 선택된 그룹 정보를 가져옴
  useEffect(() => {
    if (location.state?.selectedAllGroup && location.state?.selectedGroupData) {
      setSelectedAllGroup(location.state.selectedAllGroup);
      setSelectedGroupData(location.state.selectedGroupData);
    }
  }, [location.state]);

  // 선택된 그룹의 ID로 데이터 조회
  const groupId = selectedAllGroup || selectedGroupId || 0;
  const { data: membersData } = useMembers(groupId);

  const handleAlbumSelect = (albumId: number | null) => {
    setSelectedAlbumId(albumId);
    setIsAlbumModalOpen(false);
  };

  const handleEditGroup = () => {
    navigate('/myGroupEdit', { state: { from: '/main' } });
  };

  return (
    <>
      <Header type="main" />
      <MainContainer>
        <GroupImageList
          selectedId={selectedGroupId}
          onSelectGroup={setSelectedGroupId}
          selectedAllGroup={selectedAllGroup}
          selectedGroupData={selectedGroupData}
          onSelectAllGroup={setSelectedAllGroup}
          onEditGroup={handleEditGroup}
          setSelectedGroupData={setSelectedGroupData}
        />
        <MemberChipList
          groupId={groupId}
          selectedMember={selectedMember}
          onSelectMember={setSelectedMember}
        />
        <FilterContainer>
          {selectedMember && membersData ? (
            <SelectedMemberText>
              <span>{membersData.find((m) => m.memberId === selectedMember)?.name}</span>의 포토카드
            </SelectedMemberText>
          ) : (
            <SelectedMemberText>
              <span>{selectedGroupData?.groupNameKo}</span>의 포토카드
            </SelectedMemberText>
          )}
          <AlbumChip
            isSelected={selectedAlbumId !== null}
            onClick={() => setIsAlbumModalOpen(true)}
          />
        </FilterContainer>
        <PhotoCardList
          selectedMember={selectedMember}
          selectedAlbumId={selectedAlbumId}
          groupId={groupId}
        />
        <AlbumModal
          isOpen={isAlbumModalOpen}
          onClose={() => setIsAlbumModalOpen(false)}
          onSelectAlbum={handleAlbumSelect}
          groupId={groupId}
          selectedAlbumId={selectedAlbumId}
        />
      </MainContainer>
    </>
  );
};

export default MainPage;
