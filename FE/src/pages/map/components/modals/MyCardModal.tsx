import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import * as S from './MyCardStyle';
import SlideUpModal from '@/components/common/SlideUpModal';
import Button from '@/components/common/Button';
import { CameraIcon } from '@/assets/assets';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useGroupsAll } from '@/hooks/artist/query/useGroups';
import { useGroupSearch } from '@/hooks/search/useGroupSearch';
import { useMemberSearch } from '@/hooks/search/useMemberSearch';
import { useAlbumSearch } from '@/hooks/search/useAlbumSearch';
import { useMembersAll } from '@/hooks/artist/query/useMembers';
import { useAlbums } from '@/hooks/artist/query/useAlbums';
import { Group } from '@/types/group';
import { Member } from '@/types/member';
import { Album } from '@/types/album';
import { MyCardData } from '@/types/exchange';
import { createExchangeCard } from '@/api/exchange/exchangeCard';
import { ExchangeRequest } from '@/types/exchange';
import { postS3Image, putS3Image } from '@/api/s3/s3Image';

interface MyCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const MyCardModal = ({ isOpen, onClose, onRefresh }: MyCardModalProps) => {
  const queryClient = useQueryClient();
  const [modalStep, setModalStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // 사용자가 선택한 실제 이미지 파일
  const [currentCardImage, setCurrentCardImage] = useState<string | null>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(previewUrl);
      setImageFile(file);
      setCurrentCardImage(previewUrl);
    }
  };

  // PresignedUrl 받기
  const handleGetPresignedUrl = useCallback(async () => {
    if (!imageFile) {
      return null;
    }
    try {
      const response = await postS3Image({
        fileName: imageFile.name,
        contentType: imageFile.type,
      });
      const presignedUrl = response.result.presignedUrl;
      return presignedUrl;
    } catch (error) {
      throw error;
    }
  }, [imageFile]);

  // S3에 직접 파일을 업로드
  const handleS3Upload = async (presignedUrl: string, file: File, contentType: string) => {
    try {
      await putS3Image({
        presignedUrl: presignedUrl,
        uploadFile: file,
        header: {
          'Content-Type': contentType,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const handleModalClose = () => {
    setModalStep(1);
    onClose();
  };

  const handlePostExchangeCard = useCallback(async () => {
    let finalImageUrl = currentCardImage ?? '';

    // 이미지 파일이 있으면 S3 업로드
    if (imageFile) {
      try {
        const presignedUrl = await handleGetPresignedUrl();
        if (!presignedUrl) {
          alert('이미지 업로드 준비에 실패했습니다.');
          return;
        }
        await handleS3Upload(presignedUrl, imageFile, imageFile.type);
        finalImageUrl = presignedUrl.split('?')[0]; // S3 업로드 성공 시 영구 URL 사용
      } catch (error) {
        alert('이미지 업로드 중 오류가 발생했습니다.');
        return;
      }
    }

    try {
      const ExchangeCardData: ExchangeRequest = {
        isOwned: true,
        groupId: selectedGroupId ?? 0,
        albumId: selectedAlbumId ?? 0,
        memberId: selectedMemberId ?? 0,
        description: null,
        exchangeImageUrl: finalImageUrl,
      };
      await createExchangeCard(ExchangeCardData);
      handleModalClose();
      onRefresh();
    } catch (error) {
      throw error;
    }
  }, [selectedGroupId, selectedAlbumId, selectedMemberId, selectedImage, onRefresh]);

  const handleNextClick = () => {
    setModalStep(modalStep + 1);
  };

  const handleReturnStep1 = () => {
    setModalStep(1);
  };

  const handleReturnStep2 = () => {
    setModalStep(2);
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

  const handleSaveCardInfo = () => {
    const prev = queryClient.getQueryData<MyCardData>([QUERY_KEYS.MYCARD]) || {};
    queryClient.setQueryData<MyCardData>([QUERY_KEYS.MYCARD], {
      ...prev,
      cardImage: selectedImage || undefined,
      cardGroup: selectedGroup || undefined,
      cardMember: selectedMember || undefined,
      cardAlbum: selectedAlbum || undefined,
    });
    handleNextClick();
  };

  return (
    <SlideUpModal header="나의 포카" isOpen={isOpen} onClose={handleModalClose}>
      {modalStep === 1 ? (
        <>
          <S.MyCardModalText>교환하고 싶은 나의 포카를 촬영해주세요</S.MyCardModalText>
          <S.MyCardImageWrapper>
            <S.MyCardImageLabel>
              <S.MyCardImageInput type="file" accept="image/*" onChange={handleImageUpload} />
              {selectedImage ? (
                <S.UploadedImage src={selectedImage} alt="업로드 포카" />
              ) : (
                <S.MyCardImageContainer>
                  <S.MyCardImageIcon src={CameraIcon} />
                </S.MyCardImageContainer>
              )}
            </S.MyCardImageLabel>
          </S.MyCardImageWrapper>
          <Button text="다음" onClick={handleNextClick} disabled={!selectedImage} />
        </>
      ) : modalStep === 2 ? (
        <>
          <S.MyCardModalText>포카 정보를 선택해주세요</S.MyCardModalText>
          <S.MyCardInfoContainer>
            <S.LeftInfoContainer>
              <S.SelectContainer>
                <S.SelectHeader>그룹명</S.SelectHeader>
                <S.SelectContent onClick={handleGroupSelect} $selected={selectedGroup || undefined}>
                  {selectedGroup || '선택'}
                </S.SelectContent>
              </S.SelectContainer>
              <S.SelectContainer>
                <S.SelectHeader>멤버명</S.SelectHeader>
                <S.SelectContent
                  onClick={handleMemberSelect}
                  $selected={selectedMember || undefined}
                >
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
          </S.MyCardInfoContainer>
          <Button
            text="다음"
            onClick={handleSaveCardInfo}
            disabled={!selectedGroup || !selectedMember || !selectedAlbum}
          />
        </>
      ) : (
        <>
          <S.MyCardModalText>포카 정보를 확인하고 등록해주세요</S.MyCardModalText>
          <S.MyCardResultContainer>
            <S.MyCardResultImage src={selectedImage ?? undefined} onClick={handleReturnStep1} />
            <S.MyCardResultTextContainer onClick={handleReturnStep2}>
              <S.MyCardResultText>
                <S.MyCardResultHeader>그룹명</S.MyCardResultHeader>
                <S.MyCardResultContent>{selectedGroup}</S.MyCardResultContent>
              </S.MyCardResultText>
              <S.MyCardResultText>
                <S.MyCardResultHeader>멤버명</S.MyCardResultHeader>
                <S.MyCardResultContent>{selectedMember}</S.MyCardResultContent>
              </S.MyCardResultText>
              <S.MyCardResultText>
                <S.MyCardResultHeader>앨범명</S.MyCardResultHeader>
                <S.MyCardResultContent>{selectedAlbum}</S.MyCardResultContent>
              </S.MyCardResultText>
            </S.MyCardResultTextContainer>
          </S.MyCardResultContainer>
          <Button text="등록하기" onClick={handlePostExchangeCard} />
        </>
      )}
    </SlideUpModal>
  );
};

export default MyCardModal;
