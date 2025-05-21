import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ReportMissingPageStyle';
import Header from '@/components/common/Header';
import Button from '@/components/common/Button';
import SlideUpModal from '@/components/common/SlideUpModal';
import { fetchGroupsAll } from '@/api/artist/group';
import { fetchMembersAll } from '@/api/artist/member';
import { fetchAlbums } from '@/api/artist/album';
// import { reportMissingItem } from '@/api/postRegistration/report';
import CautionModal from '@/pages/sell/components/CautionModal';

const ReportMissingPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isCautionModalOpen, setIsCautionModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalIconType, setModalIconType] = useState<'caution' | 'success'>();

  const [reportType, setReportType] = useState<'album' | 'photocard' | null>(null);

  const [groups, setGroups] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);

  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [albumTitle, setAlbumTitle] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [modalType, setModalType] = useState<'group' | 'member' | 'album' | null>(null);

  const openModal = async (type: 'group' | 'member' | 'album') => {
    if (type === 'group') {
      const res = await fetchGroupsAll();
      setGroups(res.result);
    }
    if (type === 'member' && selectedGroup) {
      const res = await fetchMembersAll(selectedGroup.groupId);
      setMembers(res.result);
    }
    if (type === 'album' && selectedGroup) {
      const res = await fetchAlbums(selectedGroup.groupId);
      setAlbums(res.result);
    }
    setModalType(type);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    if (!reportType) return;

    // ✅ 유효성 검사
    if (reportType === 'album') {
      if (!selectedGroup || albumTitle.trim() === '') {
        setModalTitle('정보 누락');
        setModalMessage('그룹과 앨범명을 \n 모두 입력해주세요.');
        setModalIconType('caution');
        setIsCautionModalOpen(true);
        return;
      }
    }

    if (reportType === 'photocard') {
      if (!selectedGroup || !selectedMember || !selectedAlbum || !imageFile) {
        setModalTitle('정보 누락');
        setModalMessage('그룹, 멤버, 앨범, 이미지를 \n 모두 선택해주세요.');
        setModalIconType('caution');
        setIsCautionModalOpen(true);
        return;
      }
    }

    // ✅ 전송 payload 구성
    const payload: any = {
      type: reportType,
      groupId: selectedGroup?.groupId,
    };

    if (reportType === 'album') {
      payload.missingTitle = albumTitle;
    } else {
      payload.memberId = selectedMember?.memberId;
      payload.albumId = selectedAlbum?.albumId;
      payload.imageFile = imageFile;
    }

    // await reportMissingItem(payload);
    setModalTitle('제보 완료');
    setModalMessage(`미제공된 정보에 \n대한 제보가 완료되었습니다. \n 감사합니다.`);
    setModalIconType('success');
    setIsCautionModalOpen(true);
  };

  return (
    <>
      <Header type="report" />
      <S.Container>
        <S.SectionTitle>무엇을 신고하시겠어요?</S.SectionTitle>
        <S.ToggleWrapper>
          <S.ToggleButton selected={reportType === 'album'} onClick={() => setReportType('album')}>
            없는 앨범
          </S.ToggleButton>
          <S.ToggleButton selected={reportType === 'photocard'} onClick={() => setReportType('photocard')}>
            없는 포토카드
          </S.ToggleButton>
        </S.ToggleWrapper>

        {reportType && (
          <>
            <S.SelectRow>
              <S.Label>그룹 선택</S.Label>
              <Button text={selectedGroup?.groupDisplayName || '선택'} onClick={() => openModal('group')} height={42} fontStyle="bodyMedium" />
            </S.SelectRow>
          </>
        )}

        {reportType === 'album' && (
          <>
            <S.InputRow>
              <S.Label>앨범명 입력</S.Label>
              <S.InputBox value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} placeholder="앨범명을 입력해주세요" />
            </S.InputRow>
          </>
        )}

        {reportType === 'photocard' && selectedGroup && (
          <>
            <S.SelectRow>
              <S.Label>멤버 선택</S.Label>
              <Button text={selectedMember?.name || '선택'} onClick={() => openModal('member')} height={42} fontStyle="bodyMedium" />
            </S.SelectRow>
            <S.SelectRow>
              <S.Label>앨범 선택</S.Label>
              <Button text={selectedAlbum?.title || '선택'} onClick={() => openModal('album')} height={42} fontStyle="bodyMedium" />
            </S.SelectRow>
            <S.ImageUploadWrapper>
              <S.Label>포토카드 이미지 업로드</S.Label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
                ref={fileInputRef}
              />
              <Button text="이미지 선택" height={42} fontStyle="bodyMedium" onClick={() => fileInputRef.current?.click()} />
              {previewUrl && <S.ImagePreview src={previewUrl} alt="미리보기" />}
            </S.ImageUploadWrapper>
          </>
        )}

        <S.SubmitWrapper>
          <Button text="신청하기" onClick={handleSubmit} height={48} fontStyle="headingMedium" />
        </S.SubmitWrapper>
      </S.Container>

      <SlideUpModal isOpen={!!modalType} onClose={() => setModalType(null)} header="선택">
        <S.ModalList>
          {modalType === 'group' &&
            groups.map((g) => (
              <S.ModalItem key={g.groupId} onClick={() => {
                setSelectedGroup(g);
                setSelectedMember(null);
                setSelectedAlbum(null);
                setModalType(null);
              }}>
                {g.groupDisplayName}
              </S.ModalItem>
            ))}
          {modalType === 'member' &&
            members.map((m) => (
              <S.ModalItem key={m.memberId} onClick={() => {
                setSelectedMember(m);
                setModalType(null);
              }}>
                {m.name}
              </S.ModalItem>
            ))}
          {modalType === 'album' &&
            albums.map((a) => (
              <S.ModalItem key={a.albumId} onClick={() => {
                setSelectedAlbum(a);
                setModalType(null);
              }}>
                {a.title}
              </S.ModalItem>
            ))}
        </S.ModalList>
      </SlideUpModal>

      <CautionModal
        isOpen={isCautionModalOpen}
        onClose={() => {
            setIsCautionModalOpen(false);
            
            if (modalIconType === 'success') {
            navigate('/sell');
            }
        }}
        title={modalTitle}
        message={modalMessage}
        iconType={modalIconType}
        />

    </>
  );
};

export default ReportMissingPage;
