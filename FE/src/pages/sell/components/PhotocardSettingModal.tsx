import React, { useEffect, useState } from 'react';
import SlideUpModal from '@/components/common/SlideUpModal';
import Button from '@/components/common/Button';
import * as S from './PhotocardSettingModalStyle';
import { fetchGroupsAll } from '@/api/artist/group';
import { fetchMembersAll } from '@/api/artist/member';
import { fetchAlbums } from '@/api/artist/album';
import { fetchPhotocards } from '@/api/artist/photocard';
import { useNavigate } from 'react-router-dom';
import { CallIcon } from '@/assets/assets'

interface GroupItem {
  groupId: number;
  groupDisplayName?: string | null; 
  groupNameKo: string;
  groupNameEn: string;
}

interface MemberItem {
  memberId: number;
  name: string;
}

interface AlbumItem {
  albumId: number;
  title: string;
}

interface PhotocardItem {
  cardId: string;
  cardImageUrl: string;
}

interface PhotocardSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: PhotocardSettingData) => void;
  initialData?: PhotocardSettingData;
  initialSection?: 'group' | 'member' | 'album' | 'version';
}

interface PhotocardSettingData {
  groupId?: number;
  group: string;
  memberId?: number;
  member: string;
  albumId?: number;
  album: string;
  versionId?: string;
  version: string;
  price: string;
}

const PhotocardSettingModal: React.FC<PhotocardSettingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialData,
  initialSection,
}) => {
  const [selectedData, setSelectedData] = useState<PhotocardSettingData>({
    groupId: undefined,
    group: '',
    memberId: undefined,
    member: '',
    albumId: undefined,
    album: '',
    version: '',
    price: '',
  });
  const [currentSection, setCurrentSection] = useState<'group' | 'member' | 'album' | 'version'>('group');
  const [searchQuery, setSearchQuery] = useState('');

  const [groupList, setGroupList] = useState<GroupItem[]>([]);
  const [memberList, setMemberList] = useState<MemberItem[]>([]);
  const [albumList, setAlbumList] = useState<AlbumItem[]>([]);
  const [photocardList, setPhotocardList] = useState<PhotocardItem[]>([]);

  const navigate = useNavigate();


  useEffect(() => {
    if (isOpen) {
      setCurrentSection(initialSection || 'group'); // ✅ 선택된 섹션 강조
      setSearchQuery('');

      fetchGroupsAll()
        .then((res) => setGroupList(Array.isArray(res.result) ? res.result : []))
        .catch(() => setGroupList([]));

      if (initialData?.groupId) {
        fetchMembersAll(initialData.groupId)
          .then((res) => setMemberList(Array.isArray(res.result) ? res.result : []))
          .catch(() => setMemberList([]));

        fetchAlbums(initialData.groupId)
          .then((res) => setAlbumList(Array.isArray(res.result) ? res.result : []))
          .catch(() => setAlbumList([]));

        setSelectedData(initialData);

      }
    }
  }, [isOpen, initialData, initialSection]);

  // 섹션 변경 시 검색어 초기화
  useEffect(() => {
    setSearchQuery('');
  }, [currentSection]);


  const handleGroupSelect = (group: GroupItem) => {
    setSelectedData({
      ...selectedData,
      groupId: group.groupId,
      group: group.groupDisplayName ?? '',
      memberId: undefined,
      member: '',
      albumId: undefined,
      album: '',
      versionId: undefined,
      version: '',
    });
    setCurrentSection('member');
    fetchMembersAll(group.groupId)
      .then((res) => setMemberList(Array.isArray(res.result) ? res.result : []))
      .catch(() => setMemberList([]));
    fetchAlbums(group.groupId)
      .then((res) => setAlbumList(Array.isArray(res.result) ? res.result : []))
      .catch(() => setAlbumList([]));
  };

  const handleMemberSelect = (member: MemberItem) => {
    setSelectedData({
      ...selectedData,
      memberId: member.memberId,
      member: member.name,
    });
    setCurrentSection('album');
  };

  const handleAlbumSelect = async (album: AlbumItem) => {
    setSelectedData({
      ...selectedData,
      albumId: album.albumId,
      album: album.title,
    });
    setCurrentSection('version');

    if (selectedData.memberId) {
      try {
        const response = await fetchPhotocards(album.albumId, selectedData.memberId);
        const mappedCards = response.result?.photoCards.map((card) => ({
          cardId: String(card.cardId),
          cardImageUrl: card.cardImageUrl,
        })) ?? [];
        setPhotocardList(mappedCards);
      } catch {
        setPhotocardList([]);
      }
    }
  };

  const filteredGroups = groupList.filter((g) =>
    `${g.groupNameKo} ${g.groupNameEn}`.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const filteredMembers = memberList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = albumList.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderVersionGrid = () => (
    <>
      <S.VersionTitle>어떤 버전인가요?</S.VersionTitle>
      <S.VersionGrid>
        {photocardList.length === 0 && (
          <S.NoPhotocardText>아직 등록된<br></br> 포토카드가 없습니다.</S.NoPhotocardText>
        )}
        {photocardList.map((card, index) => (
          <S.VersionItem key={card.cardId} onClick={() => {
            setSelectedData({ ...selectedData, versionId: card.cardId, version: card.cardId });
          }}>
            <S.VersionImage
              src={card.cardImageUrl}
              selected={selectedData.versionId === card.cardId}
              alt={`버전 ${index + 1}`}
            />
          </S.VersionItem>
        ))}
        <S.ReportButton onClick={() => navigate('/report-missing')}>
          <div className="icon-text-wrapper">
            <img src={CallIcon} alt="제보 아이템" />
            <span>
              포토카드 <br /> 제보하기
            </span>
          </div>
        </S.ReportButton>

      </S.VersionGrid>
    </>
  );

  const renderList = () => {
    if (currentSection === 'group') {
      return filteredGroups.map((g) => (
        <S.Item key={g.groupId} selected={selectedData.groupId === g.groupId} onClick={() => handleGroupSelect(g)}>
          {g.groupDisplayName}
        </S.Item>
      ));
    }

    if (currentSection === 'member') {
      return filteredMembers.map((m) => (
        <S.Item key={m.memberId} selected={selectedData.memberId === m.memberId} onClick={() => handleMemberSelect(m)}>
          {m.name}
        </S.Item>
      ));
    }

    if (currentSection === 'album') {
      return (
        <>
          {filteredAlbums.map((a) => (
            <S.Item key={a.albumId} selected={selectedData.albumId === a.albumId} onClick={() => handleAlbumSelect(a)}>
              {a.title}
            </S.Item>
          ))}
          <S.ReportButton onClick={() => navigate('/report-missing')}>
            <div className="icon-text-wrapper">
              <img src={CallIcon} alt="제보 아이템" />
              <span>
                앨범 <br /> 제보하기
              </span>
            </div>
          </S.ReportButton>
        </>
      );
    }

    return renderVersionGrid();
  };


  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} header="포카 설정">
      <S.Container>
        <S.LeftSection>
          <S.SettingLabel onClick={() => setCurrentSection('group')} selected={currentSection === 'group'}>
            <S.LabelText>그룹명</S.LabelText>
            <S.SelectedValue>{selectedData.group || '선택'}</S.SelectedValue>
          </S.SettingLabel>
          <S.SettingLabel onClick={() => setCurrentSection('member')} selected={currentSection === 'member'}>
            <S.LabelText>멤버명</S.LabelText>
            <S.SelectedValue>{selectedData.member || '선택'}</S.SelectedValue>
          </S.SettingLabel>
          <S.SettingLabel onClick={() => setCurrentSection('album')} selected={currentSection === 'album'}>
            <S.LabelText>앨범명</S.LabelText>
            <S.SelectedValue>{selectedData.album || '선택'}</S.SelectedValue>
          </S.SettingLabel>
          <S.SettingLabel onClick={() => setCurrentSection('version')}>
            <S.LabelText>버전</S.LabelText>
            <S.SelectedValue>{selectedData.versionId ? '선택 완료' : '선택'}</S.SelectedValue>
          </S.SettingLabel>
        </S.LeftSection>

        <S.RightSection>
          <S.SearchSection>
            <S.SearchInput
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <S.ItemList>
              {renderList()}
            </S.ItemList>
          </S.SearchSection>
        </S.RightSection>
      </S.Container>

      <S.ButtonWrapper>
        <Button
          height={48}
          fontStyle="headingMedium"
          onClick={() => onConfirm(selectedData)}
          text="등록하기"
          disabled={!selectedData.groupId || !selectedData.memberId || !selectedData.albumId || !selectedData.versionId}
        />
      </S.ButtonWrapper>
    </SlideUpModal>
  );
};

export default PhotocardSettingModal;