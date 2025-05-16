import { CautionIcon, PhotocardIcon } from '@/assets/assets'; 
import * as S from './CautionModalStyle';

interface CautionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  iconType?: 'caution' | 'success';
}

const CautionModal: React.FC<CautionModalProps> = ({ isOpen, onClose, title, message, iconType}) => {
  if (!isOpen) return null;

  return (
    <S.Overlay $isOpen={isOpen} onClick={onClose}>
      <S.ModalContainer $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <S.CautionIconWrapper>
           <img
            src={iconType === 'success' ? PhotocardIcon : CautionIcon}
            alt={iconType === 'success' ? '성공 아이콘' : '경고 아이콘'}
          />
        </S.CautionIconWrapper>
        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
        <S.ConfirmButton onClick={onClose}>확인</S.ConfirmButton>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default CautionModal;
