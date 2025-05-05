import { CautionIcon } from '@/assets/assets';
import * as S from './CautionModalStyle';

interface CautionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CautionModal: React.FC<CautionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <S.Overlay $isOpen={isOpen} onClick={onClose}>
      <S.ModalContainer $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <S.CautionIconWrapper>
          <img src={CautionIcon} alt="경고 아이콘" />
        </S.CautionIconWrapper>
        <S.Title>모든 카드의 정보를 선택해주세요</S.Title>
        <S.Message>아직 선택되지 않은 카드가 있어요!</S.Message>
        <S.ConfirmButton onClick={onClose}>확인</S.ConfirmButton>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default CautionModal;
