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

interface PhotocardSettingData {
  groupId?: number;
  group: string;        // ex) "아이브 (IVE)"
  memberId?: number;
  member: string;
  albumId?: number;
  album: string;
  versionId?: string;
  version: string;
  price: string;
}



const PostPage = () => {
  const navigate = useNavigate();
  
  const location = useLocation();
  const geminiResult = location.state?.geminiResult as GeminiResultItem[] || [];

  const [isCautionModalOpen, setIsCautionModalOpen] = useState(false);
  const [initialSettings, setInitialSettings] = useState<PhotocardSettingData[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  const optionSectionRef = useRef<{
    photocardSettings: PhotocardSettingData[];
  }>(null);

  useEffect(() => {
    const fetchMatching = async () => {
      try {
        if (geminiResult.length === 0) return;

        const payload = geminiResult.map(({ groupName, memberName }) => ({
          groupName,
          memberName,
        }));

        const matched: MatchingResultItem[] = await resolveMatching(payload);

        const settings: PhotocardSettingData[] = matched.map((item) => ({
          groupId: item.groupId,
          group: `${item.groupNameKo} (${item.groupNameEn})`,
          memberId: item.memberId ?? undefined,
          member: item.memberName ?? '',
          album: '',
          version: '',
          price: '',
        }));

        const images = geminiResult.map((g) => g.postImageUrl);

        setInitialSettings(settings);
        setImageList(images);
      } catch (error) {
        console.error('매칭 실패:', error);
      }
    };

    fetchMatching();
  }, [geminiResult]);

  const handleRegisterClick = async () => {
    const settings = optionSectionRef.current?.photocardSettings;
    if (!settings || imageList.length !== settings.length) return;

    const isAllComplete = settings.every(
      (setting) =>
        setting.group &&
        setting.member &&
        setting.album &&
        setting.version &&
        setting.price
    );

    if (!isAllComplete) {
      setIsCautionModalOpen(true);
      return;
    }

    try {
      // 변환 로직: PhotocardSettingData → RegisterPostItem[]
      const payload = settings.map((setting, index) => ({
        cardId: Number(setting.versionId),          // versionId가 string이므로 변환
        postImageUrl: imageList[index],
        price: Number(setting.price.replace(/,/g, '')),
      }));

      const result = await registerPhotoCardPosts(payload);

      console.log('등록 성공:', result);
      // 이후 페이지 이동 or 알림 처리 등 추가 가능
      alert(`${result.length}개의 게시물이 등록되었습니다.`);
      navigate('/mySaleList');
    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록에 실패했습니다.');
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
      <CautionModal isOpen={isCautionModalOpen} onClose={() => setIsCautionModalOpen(false)} />
    </>
  );
};

export default PostPage;
