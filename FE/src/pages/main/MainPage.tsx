import Header from '@/components/common/Header.tsx';
import GroupImageList from '@/pages/main/components/Group/GroupImageList';
import MemberChipList from '@/pages/main/components/Chip/MemberChipList';
import PhotoCardList from '@/pages/main/components/PhotoCard/PhotoCardList';
import AlbumChip from '@/pages/main/components/Album/AlbumChip';
import AlbumModal from '@/pages/main/components/Album/AlbumModal';
import { useState, useMemo, useEffect } from 'react';
import { SelectedMemberText, MainContainer, FilterContainer } from './MainPageStyle';
import { useLocation } from 'react-router-dom';
import { useLikedGroups } from '@/hooks/user/query/useLike';
import { UserLikedGroup } from '@/types/user';
import { useMembers } from '@/hooks/artist/query/useMembers';

const MainPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [selectedAllGroup, setSelectedAllGroup] = useState<number | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  const location = useLocation();
  const { data: likedGroups } = useLikedGroups();
  const groupId = selectedGroupId || selectedAllGroup || 0;
  const { data: membersData } = useMembers(groupId);

  // 컴포넌트 마운트 시 첫 번째 관심그룹 선택
  useEffect(() => {
    if (likedGroups?.result && (likedGroups.result as UserLikedGroup[]).length > 0) {
      const firstGroup = (likedGroups.result as UserLikedGroup[])[0];
      setSelectedGroupId(firstGroup.groupId);
    }
  }, [likedGroups]);

  // location.state에서 선택된 그룹 정보를 가져옴
  useMemo(() => {
    if (location.state?.selectedAllGroup) {
      setSelectedAllGroup(location.state.selectedAllGroup);
    }
  }, [location.state]);

  const selectedGroup = useMemo(() => {
    const groupId = selectedGroupId || selectedAllGroup;
    if (!likedGroups?.result) return null;
    return (likedGroups.result as UserLikedGroup[]).find((group) => group.groupId === groupId);
  }, [selectedGroupId, selectedAllGroup, likedGroups]);

  const handleAlbumSelect = (albumId: number | null) => {
    setSelectedAlbumId(albumId);
    setIsAlbumModalOpen(false);
  };

  // 선택된 멤버의 이름 찾기
  const selectedMemberName = useMemo(() => {
    if (!selectedMember || !membersData) return null;
    const member = membersData.find((m) => m.memberId === selectedMember);
    return member?.name || null;
  }, [selectedMember, membersData]);

  return (
    <>
      <Header type="main" />
      <MainContainer>
        <GroupImageList
          selectedId={selectedGroupId}
          onSelectGroup={setSelectedGroupId}
          selectedAllGroup={selectedAllGroup}
          onSelectAllGroup={setSelectedAllGroup}
        />
        {(selectedGroupId || selectedAllGroup) && (
          <MemberChipList
            groupId={selectedGroupId || selectedAllGroup || 0}
            selectedMember={selectedMember}
            onSelectMember={setSelectedMember}
          />
        )}
        <FilterContainer>
          {selectedMemberName && (
            <SelectedMemberText>
              <span>{selectedMemberName}</span>의 포토카드
            </SelectedMemberText>
          )}
          {!selectedMember && selectedGroup && (
            <SelectedMemberText>
              <span>{selectedGroup.groupNameKo}</span>의 포토카드
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
