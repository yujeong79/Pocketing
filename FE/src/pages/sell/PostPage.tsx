import { useState, useRef } from 'react';
import Header from '@/components/common/Header';
import * as S from './PostPageStyle';
import OptionSection from '@/pages/sell/components/OptionSection';
import CautionModal from '@/pages/sell/components/CautionModal';

interface PhotocardSettingData {
  group: string;
  member: string;
  album: string;
  version: string;
  price: string;
}

const PostPage = () => {
  const [isCautionModalOpen, setIsCautionModalOpen] = useState(false);
  const optionSectionRef = useRef<{
    photocardSettings: PhotocardSettingData[];
  }>(null);

  const handleRegisterClick = () => {
    const settings = optionSectionRef.current?.photocardSettings;
    if (!settings) return;

    const isAllComplete = settings.every(
      (setting) =>
        setting.group && setting.member && setting.album && setting.version && setting.price
    );

    if (!isAllComplete) {
      setIsCautionModalOpen(true);
      return;
    }

    // TODO: 등록 로직 구현
    console.log('모든 옵션이 설정되어 있습니다. 등록을 진행합니다.');
  };

  return (
    <>
      <Header type="post" onRegister={handleRegisterClick} />
      <S.Container>
        <OptionSection ref={optionSectionRef} />
      </S.Container>
      <CautionModal isOpen={isCautionModalOpen} onClose={() => setIsCautionModalOpen(false)} />
    </>
  );
};

export default PostPage;
