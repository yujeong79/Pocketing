import Header from '@/components/common/Header.tsx';
import GroupImageList from '@/pages/main/components/Group/GroupImageList';
import MemberChipList from '@/pages/main/components/Chip/MemberChipList';
import PhotoCardList from '@/pages/main/components/PhotoCard/PhotoCardList';
import AlbumChip from '@/pages/main/components/Album/AlbumChip';
import AlbumModal from '@/pages/main/components/Album/AlbumModal';
import { useState, useEffect, useRef } from 'react';
import { useLikedGroups } from '@/hooks/user/query/useLike';
import { SelectedMemberText, MainContainer, FilterContainer } from './MainPageStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMembers } from '@/hooks/artist/query/useMembers';
import { Group } from '@/types/group';
import { UserLikedGroup } from '@/types/user';

const MainPage = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [selectedAllGroup, setSelectedAllGroup] = useState<number | null>(null);
  const [selectedGroupData, setSelectedGroupData] = useState<Group | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  // 관심 그룹 불러오기
  const { data: likedGroups } = useLikedGroups();
  // 초기 한 번만 관심메버 자동 선택
  const memberInitRef = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();

  // 로그인 직후, 관심 그룹이 있으면 첫 번재 그룹 선택
  useEffect(() => {
    if (likedGroups?.result?.length && selectedGroupId === null && selectedAllGroup === null) {
      const first = (likedGroups.result as UserLikedGroup[])[0];
      setSelectedGroupId(first.groupId);
      setSelectedGroupData({
        groupId: first.groupId,
        groupNameKo: first.groupNameKo,
        groupNameEn: first.groupNameEn,
        groupImageUrl: first.groupImageUrl || '',
        members: null,
        interest: true,
      });
    }
  }, [likedGroups, selectedGroupId, selectedAllGroup]);

  // 선택된 그룹의 ID로 데이터 조회
  const groupId = selectedAllGroup || selectedGroupId || 0;
  const { data: membersData } = useMembers(groupId);

  useEffect(() => {
    if (!memberInitRef.current && membersData?.length) {
      const interest = membersData.find((member) => member.interest);
      if (interest) {
        setSelectedMember(interest.memberId);
      }
      // 한 번만 실행되도록 플래그 세팅
      memberInitRef.current = true;
    }
  }, [membersData, selectedMember]);

  // location.state에서 선택된 그룹 정보를 가져옴
  useEffect(() => {
    if (location.state?.selectedAllGroup && location.state?.selectedGroupData) {
      setSelectedAllGroup(location.state.selectedAllGroup);
      setSelectedGroupData(location.state.selectedGroupData);
    }
  }, [location.state]);

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
