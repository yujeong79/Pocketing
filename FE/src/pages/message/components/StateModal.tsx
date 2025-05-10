import SlideUpModal from '@/components/common/SlideUpModal';
import * as S from './StateModalStyle';

interface StateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (status: 'AVAILABLE' | 'COMPLETED') => void;
  currentStatus: 'AVAILABLE' | 'COMPLETED';
}

const StateModal = ({ isOpen, onClose, onSelect, currentStatus }: StateModalProps) => {
  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} isCloseButtonHidden={true}>
      <S.StateList>
        <S.StateItem
          $isSelected={currentStatus === 'AVAILABLE'}
          onClick={() => {
            onSelect('AVAILABLE');
            onClose();
          }}
        >
          판매중
        </S.StateItem>
        <S.StateItem
          $isSelected={currentStatus === 'COMPLETED'}
          onClick={() => {
            onSelect('COMPLETED');
            onClose();
          }}
        >
          거래완료
        </S.StateItem>
      </S.StateList>
    </SlideUpModal>
  );
};

export default StateModal;
