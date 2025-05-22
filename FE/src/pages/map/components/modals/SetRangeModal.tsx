import * as S from './SetRangeModalStyle';
import SlideUpModal from '@/components/common/SlideUpModal';

interface SetRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  range: number;
  onRangeChange: (range: number) => void;
}

const SetRangeModal = ({ isOpen, onClose, range, onRangeChange }: SetRangeModalProps) => {
  return (
    <SlideUpModal header="반경 설정" isOpen={isOpen} onClose={onClose}>
      <S.RangeModalText>근처에서 포케터를 검색할 반경을 선택해주세요</S.RangeModalText>
      <S.RangeContainer>
        <S.Range100 $selected={range === 100} onClick={() => onRangeChange(100)}>
          100m
        </S.Range100>
        <S.Range300 $selected={range === 300} onClick={() => onRangeChange(300)}>
          300m
        </S.Range300>
        <S.Range500 $selected={range === 500} onClick={() => onRangeChange(500)}>
          500m
        </S.Range500>
      </S.RangeContainer>
    </SlideUpModal>
  );
};

export default SetRangeModal;
