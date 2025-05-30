import Header from '@/components/common/Header.tsx';
import GroupImageList from '@/pages/main/components/Group/GroupImageList';
import MemberChipList from '@/pages/main/components/Chip/MemberChipList';
import PhotoCardList from '@/pages/main/components/PhotoCard/PhotoCardList';
import AlbumChip from '@/pages/main/components/Album/AlbumChip';
import AlbumModal from '@/pages/main/components/Album/AlbumModal';
import { useState, useEffect } from 'react';
import { useLikedGroups } from '@/hooks/user/query/useLike';
import { SelectedMemberText, MainContainer, FilterContainer } from './MainPageStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMembers } from '@/hooks/artist/query/useMembers';
import { UserLikedGroup } from '@/types/user';
import { useMainPageStore } from '@/store/mainPageStore';
import { useSales, useCompleteSales } from '@/hooks/sales/useSales';
import { useProfile } from '@/hooks/user/useProfile';
import { useMyCard } from '@/hooks/exchange/useExchange';
import { useGlobalStore } from '@/store/globalStore';
import { useOthersCard } from '@/hooks/exchange/useExchange';
import { useNotification } from '@/hooks/notification/useNotification';

const MainPage = () => {
  const {
    selectedGroupId,
    setSelectedGroupId,
    selectedMember,
    setSelectedMember,
    selectedAlbumId,
    setSelectedAlbumId,
    selectedAllGroup,
    setSelectedAllGroup,
    selectedGroupData,
    setSelectedGroupData,
  } = useMainPageStore();
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const { fetchSales } = useSales();
  const { fetchCompleteSales } = useCompleteSales();
  const { fetchProfile } = useProfile();
  const { fetchMyCard } = useMyCard();
  const { fetchOthersCard } = useOthersCard();
  const { fetchNotification } = useNotification();
  const {
    isProfileLoading,
    setIsProfileLoading,
    isSalesLoading,
    setIsSalesLoading,
    isCompleteSalesLoading,
    setIsCompleteSalesLoading,
    isMyCardLoading,
    setIsMyCardLoading,
    isMyWishCardLoading,
    setIsMyWishCardLoading,
    isNotificationLoading,
    setIsNotificationLoading,
  } = useGlobalStore();

  // 관심 그룹 불러오기
  const { data: likedGroups } = useLikedGroups();

  const location = useLocation();
  const navigate = useNavigate();

  // 초기 데이터 로딩
  useEffect(() => {
    if (!isProfileLoading) {
      fetchProfile();
      setIsProfileLoading(true);
    }

    if (!isSalesLoading) {
      fetchSales();
      setIsSalesLoading(true);
    }

    if (!isCompleteSalesLoading) {
      fetchCompleteSales();
      setIsCompleteSalesLoading(true);
    }

    if (!isMyCardLoading) {
      fetchMyCard();
      setIsMyCardLoading(true);
    }

    if (!isMyWishCardLoading) {
      fetchOthersCard();
      setIsMyWishCardLoading(true);
    }

    if (!isNotificationLoading) {
      fetchNotification();
      setIsNotificationLoading(true);
    }
  }, [
    isProfileLoading,
    isSalesLoading,
    isCompleteSalesLoading,
    isMyCardLoading,
    isMyWishCardLoading,
    isNotificationLoading,
    fetchSales,
    fetchCompleteSales,
    fetchProfile,
    fetchMyCard,
    fetchOthersCard,
    fetchNotification,
    setIsProfileLoading,
    setIsSalesLoading,
    setIsCompleteSalesLoading,
    setIsMyCardLoading,
    setIsMyWishCardLoading,
    setIsNotificationLoading,
  ]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likedGroups, selectedGroupId, selectedAllGroup]);

  // 선택된 그룹의 ID로 데이터 조회
  const groupId = selectedAllGroup || selectedGroupId || 0;
  const { data: membersData } = useMembers(groupId);

  // 그룹이 변경될 때마다 해당 그룹의 첫 번째 관심 멤버를 선택
  useEffect(() => {
    if (membersData?.result && selectedGroupId !== null) {
      if (selectedMember === null) {
        return;
      }
      const memberIds = membersData.result.map((m) => m.memberId);
      if (memberIds.includes(selectedMember)) {
        return;
      }
      // 포함되어 있지 않으면 첫 번째 관심 멤버 선택
      const interestMembers = membersData.result.filter((member) => member.interest);
      if (interestMembers.length > 0) {
        setSelectedMember(interestMembers[0].memberId);
      } else {
        setSelectedMember(null);
      }
      // 그룹이 바뀔 때 앨범 필터도 초기화
      setSelectedAlbumId(null);
    }
  }, [selectedGroupId, membersData, selectedMember, setSelectedMember, setSelectedAlbumId]);

  // location.state에서 선택된 그룹 정보를 가져옴
  useEffect(() => {
    if (location.state?.selectedAllGroup && location.state?.selectedGroupData) {
      setSelectedAllGroup(location.state.selectedAllGroup);
      setSelectedGroupData(location.state.selectedGroupData);
      // 전체 그룹 선택 시 선택된 멤버 초기화
      setSelectedMember(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  useEffect(() => {
    if (!likedGroups?.result) return;

    const userLikedGroups = (likedGroups.result as UserLikedGroup[]).filter(
      (item): item is UserLikedGroup => 'groupId' in item
    );

    const stillExists = userLikedGroups.some((group) => group.groupId === selectedGroupId);

    if (!stillExists) {
      if (userLikedGroups.length > 0) {
        const first = userLikedGroups[0];
        setSelectedGroupId(first.groupId);
        setSelectedGroupData({
          groupId: first.groupId,
          groupNameKo: first.groupNameKo,
          groupNameEn: first.groupNameEn,
          groupImageUrl: first.groupImageUrl || '',
          members: null,
          interest: true,
        });
        setSelectedMember(null);
      } else {
        setSelectedGroupId(null);
        setSelectedGroupData(null);
        setSelectedMember(null);
      }
    }
  }, [likedGroups, selectedGroupId, setSelectedGroupId, setSelectedGroupData, setSelectedMember]);

  const handleAlbumSelect = (albumId: number | null) => {
    setSelectedAlbumId(albumId);
    setIsAlbumModalOpen(false);
  };

  const handleEditGroup = () => {
    navigate('/myGroupEdit', { state: { from: '/main' } });
  };

  const handleHeaderClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header type="main" onClick={handleHeaderClick} />
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
          {selectedMember && membersData?.result ? (
            <SelectedMemberText>
              <span>
                {membersData.result.find((m) => m.memberId === selectedMember)?.name || ''}
              </span>
              의 포토카드
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
