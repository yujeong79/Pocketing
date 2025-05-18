import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/common/Header';
import * as S from './PostPageStyle';
import OptionSection from '@/pages/sell/components/OptionSection';
import CautionModal from '@/pages/sell/components/CautionModal';
import { resolveMatching } from '@/api/artist/matching';
import { GeminiResultItem } from '@/types/gemini';
import { MatchingResultItem } from '@/types/matching';
import { registerPhotoCardPosts } from '@/api/postRegistration/register';
import { useNavigate } from 'react-router-dom';
import { useSales } from '@/hooks/sales/useSales';

interface PhotocardSettingData {
  groupId?: number;
  group: string; // ex) "아이브 (IVE)"
  memberId?: number;
  member: string;
  albumId?: number;
  album: string;
  versionId?: string;
  version: string;
  price: string;
}

const PostPage = () => {
  const { fetchSales } = useSales();
  const navigate = useNavigate();

  const location = useLocation();
  const geminiResult = (location.state?.geminiResult as GeminiResultItem[]) || [];

  const [isCautionModalOpen, setIsCautionModalOpen] = useState(false);
  const [initialSettings, setInitialSettings] = useState<PhotocardSettingData[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  const optionSectionRef = useRef<{
    photocardSettings: PhotocardSettingData[];
  }>(null);

  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalIconType, setModalIconType] = useState<'caution' | 'success'>();

  // 상태 하나 추가
  const [afterConfirmNavigate, setAfterConfirmNavigate] = useState(false);

  useEffect(() => {
    const fetchMatching = async () => {
      try {
        if (geminiResult.length === 0) return;

        const payload = geminiResult.map(({ groupName, memberName }) => ({
          groupName,
          memberName,
        }));

        const matched: MatchingResultItem[] = await resolveMatching(payload);

        const settings: PhotocardSettingData[] = geminiResult.map((_, index) => {
          const matchedItem = matched[index]; // ⬅ 순서 보장: 매칭된 것만 채워서 오고, 실패한 건 아예 빠짐

          if (matchedItem) {
            return {
              groupId: matchedItem.groupId,
              group: matchedItem.groupDisplayName ?? '',
              memberId: matchedItem.memberId ?? undefined,
              member: matchedItem.memberName ?? '',
              album: '',
              version: '',
              price: '',
            };
          } else {
            // 매칭 실패 → 빈 값으로 초기화
            return {
              groupId: undefined,
              group: '',
              memberId: undefined,
              member: '',
              album: '',
              version: '',
              price: '',
            };
          }
        });

        const images = geminiResult.map((g) => g.postImageUrl);

        setInitialSettings(settings);
        setImageList(images);
      } catch (error) {
        console.error('매칭 실패:', error);
      }
    };

    fetchMatching();
  }, [geminiResult]);

  useEffect(() => {
    const handlePopState = () => {
      if (window.history.state?.idx > 0) {
        navigate('/guide', { replace: true });
      } // ✅ 기기 뒤로가기도 가이드로
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleRegisterClick = async () => {
    const settings = optionSectionRef.current?.photocardSettings;
    if (!settings || imageList.length !== settings.length) return;

    const isAllComplete = settings.every(
      (setting) =>
        setting.group && setting.member && setting.album && setting.version && setting.price
    );

    if (!isAllComplete) {
      setModalTitle('카드 정보 누락');
      setModalMessage('아직 선택되지 않은 카드가 있어요!');
      setModalIconType('caution');
      setIsCautionModalOpen(true);
      return;
    }

    try {
      // 변환 로직: PhotocardSettingData → RegisterPostItem[]
      const payload = settings.map((setting, index) => ({
        cardId: Number(setting.versionId), // versionId가 string이므로 변환
        postImageUrl: imageList[index],
        price: Number(setting.price.replace(/,/g, '')),
      }));

      const result = await registerPhotoCardPosts(payload);

      console.log('등록 성공:', result);

      fetchSales();
      // 이후 페이지 이동 or 알림 처리 등 추가 가능
      setModalTitle('등록 완료');
      setModalMessage(`${result.length}개의\n 게시물이 등록되었습니다.`);
      setIsCautionModalOpen(true);
      setModalIconType('success');

      setAfterConfirmNavigate(true);
    } catch (error) {
      console.error('등록 실패:', error);
      setModalTitle('등록 실패');
      setModalMessage('등록에 실패했습니다.\n 다시 등록을 시도해주세요.');
      setModalIconType('caution');
      setIsCautionModalOpen(true);
    }
  };

  return (
    <>
      <Header type="post" onRegister={handleRegisterClick} />
      <S.Container>
        {initialSettings.length > 0 && imageList.length > 0 && (
          <OptionSection
            ref={optionSectionRef}
            initialSettings={initialSettings}
            imageList={imageList}
          />
        )}
      </S.Container>
      <CautionModal
        isOpen={isCautionModalOpen}
        onClose={() => {
          setIsCautionModalOpen(false);
          if (afterConfirmNavigate) {
            navigate('/mySaleList', {
              replace: true,
              state: { fromRegister: true },
            });
            setAfterConfirmNavigate(false); // 초기화
          }
        }}
        title={modalTitle}
        message={modalMessage}
        iconType={modalIconType}
      />
    </>
  );
};

export default PostPage;
