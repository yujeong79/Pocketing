import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import * as S from './OthersCardModalStyle';
import SlideUpModal from '@/components/common/SlideUpModal';
import Button from '@/components/common/Button';
import { useGroupsAll } from '@/hooks/artist/query/useGroups';
import { useMembersAll } from '@/hooks/artist/query/useMembers';
import { useAlbumSearch } from '@/hooks/search/useAlbumSearch';
import { useAlbums } from '@/hooks/artist/query/useAlbums';
import { useGroupSearch } from '@/hooks/search/useGroupSearch';
import { useMemberSearch } from '@/hooks/search/useMemberSearch';
import { Group } from '@/types/group';
import { Member } from '@/types/member';
import { Album } from '@/types/album';
import { ExchangeRequest } from '@/types/exchange';
import { createExchangeCard } from '@/api/exchange/exchangeCard';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { OthersCardData } from '@/types/exchange';

interface OthersCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const OthersCardModal = ({ isOpen, onClose, onRefresh }: OthersCardModalProps) => {
  const queryClient = useQueryClient();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);

  const [isGroupSelectOpen, setIsGroupSelectOpen] = useState(false);
  const [isMemberSelectOpen, setIsMemberSelectOpen] = useState(false);
  const [isAlbumSelectOpen, setIsAlbumSelectOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: groupsData } = useGroupsAll();
  const { data: membersData } = useMembersAll(selectedGroupId ?? 0);
  const { data: albumsData } = useAlbums(selectedGroupId ?? 0);
  const { filteredGroups } = useGroupSearch({ groups: groupsData?.result, searchTerm });
  const { filteredMembers } = useMemberSearch({ members: membersData?.result, searchTerm });
  const { filteredAlbums } = useAlbumSearch({ albums: albumsData?.result, searchTerm });

  const handleModalClose = () => {
    onClose();
  };

  const handleGroupSelect = () => {
    setIsGroupSelectOpen(true);
    setIsMemberSelectOpen(false);
    setSelectedMember(null);
    setIsAlbumSelectOpen(false);
    setSelectedAlbum(null);
  };

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group.groupNameKo);
    setSelectedGroupId(group.groupId);
  };

  const handleMemberSelect = () => {
    setIsGroupSelectOpen(false);
    setIsMemberSelectOpen(true);
    setIsAlbumSelectOpen(false);
    setSelectedAlbum(null);
  };

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member.name);
    setSelectedMemberId(member.memberId);
  };

  const handleAlbumSelect = () => {
    setIsGroupSelectOpen(false);
    setIsMemberSelectOpen(false);
    setIsAlbumSelectOpen(true);
  };

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album.title);
    setSelectedAlbumId(album.albumId);
  };

  const handlePostExchangeCard = useCallback(async () => {
    try {
      const ExchangeCardData: ExchangeRequest = {
        isOwned: false,
        groupId: selectedGroupId ?? 0,
        albumId: selectedAlbumId ?? 0,
        memberId: selectedMemberId ?? 0,
        description: null,
        exchangeImageUrl: null,
      };
      await createExchangeCard(ExchangeCardData);
      handleSaveCardInfo();
      handleModalClose();
      onRefresh();
    } catch (error) {
      throw error;
    }
  }, [selectedGroupId, selectedAlbumId, selectedMemberId, onRefresh]);

  const handleSaveCardInfo = () => {
    const prev = queryClient.getQueryData<OthersCardData>([QUERY_KEYS.OTHERSCARD]) || {};
    queryClient.setQueryData<OthersCardData>([QUERY_KEYS.OTHERSCARD], {
      ...prev,
      cardGroup: selectedGroup || undefined,
      cardMember: selectedMember || undefined,
      cardAlbum: selectedAlbum || undefined,
    });
  };

  return (
    <SlideUpModal header="원하는 포카" isOpen={isOpen} onClose={onClose}>
      <S.OthersCardModalText>교환하고 싶은 포카를 선택해주세요</S.OthersCardModalText>
      <S.OthersCardInfoContainer>
        <S.LeftInfoContainer>
          <S.SelectContainer>
            <S.SelectHeader>그룹명</S.SelectHeader>
            <S.SelectContent onClick={handleGroupSelect} $selected={selectedGroup || undefined}>
              {selectedGroup || '선택'}
            </S.SelectContent>
          </S.SelectContainer>
          <S.SelectContainer>
            <S.SelectHeader>멤버명</S.SelectHeader>
            <S.SelectContent onClick={handleMemberSelect} $selected={selectedMember || undefined}>
              {selectedMember || '선택'}
            </S.SelectContent>
          </S.SelectContainer>
          <S.SelectContainer>
            <S.SelectHeader>앨범명</S.SelectHeader>
            <S.SelectContent onClick={handleAlbumSelect} $selected={selectedAlbum || undefined}>
              {selectedAlbum || '선택'}
            </S.SelectContent>
          </S.SelectContainer>
        </S.LeftInfoContainer>
        <S.RightInfoContainer>
          <S.SearchContainer>
            <S.SearchInput
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </S.SearchContainer>
          <S.ResultContainer>
            {isGroupSelectOpen &&
              filteredGroups.map((group) => (
                <S.ResultItem
                  key={group.groupId}
                  onClick={() => handleGroupClick(group)}
                  $isSelected={selectedGroup === group.groupNameKo}
                >
                  {group.groupNameKo}
                </S.ResultItem>
              ))}
            {isMemberSelectOpen &&
              filteredMembers.map((member) => (
                <S.ResultItem
                  key={member.memberId}
                  onClick={() => handleMemberClick(member)}
                  $isSelected={selectedMember === member.name}
                >
                  {member.name}
                </S.ResultItem>
              ))}
            {isAlbumSelectOpen &&
              filteredAlbums.map((album) => (
                <S.ResultItem
                  key={album.albumId}
                  onClick={() => handleAlbumClick(album)}
                  $isSelected={selectedAlbum === album.title}
                >
                  {album.title}
                </S.ResultItem>
              ))}
          </S.ResultContainer>
        </S.RightInfoContainer>
      </S.OthersCardInfoContainer>
      <Button
        text="확인"
        onClick={handlePostExchangeCard}
        disabled={!selectedGroup || !selectedMember || !selectedAlbum}
      />
    </SlideUpModal>
  );
};

export default OthersCardModal;
