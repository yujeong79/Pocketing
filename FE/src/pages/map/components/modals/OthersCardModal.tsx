import * as S from './OthersCardModalStyle';
import SlideUpModal from '@/components/common/SlideUpModal';
import Button from '@/components/common/Button';

interface OthersCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OthersCardModal = ({ isOpen, onClose }: OthersCardModalProps) => {
  return (
    <SlideUpModal header="원하는 포카" isOpen={isOpen} onClose={onClose}>
      <S.OthersCardModalText>교환하고 싶은 포카를 선택해주세요</S.OthersCardModalText>
      <S.OthersCardInfoContainer>
        <S.LeftInfoContainer>
          <S.SelectContainer>
            <S.SelectHeader>그룹명</S.SelectHeader>
            <S.SelectContent>선택</S.SelectContent>
          </S.SelectContainer>
          <S.SelectContainer>
            <S.SelectHeader>멤버명</S.SelectHeader>
            <S.SelectContent>선택</S.SelectContent>
          </S.SelectContainer>
          <S.SelectContainer>
            <S.SelectHeader>앨범명</S.SelectHeader>
            <S.SelectContent>선택</S.SelectContent>
          </S.SelectContainer>
        </S.LeftInfoContainer>
        <S.RightInfoContainer>
          <S.SearchContainer>
            <S.SearchInput placeholder="검색" />
          </S.SearchContainer>
          <S.ResultContainer>
            <S.ResultItem>검색 결과</S.ResultItem>
            <S.ResultItem>검색 결과</S.ResultItem>
            <S.ResultItem>검색 결과</S.ResultItem>
            <S.ResultItem>검색 결과</S.ResultItem>
            <S.ResultItem>검색 결과</S.ResultItem>
            <S.ResultItem>검색 결과</S.ResultItem>
            <S.ResultItem>검색 결과</S.ResultItem>
          </S.ResultContainer>
        </S.RightInfoContainer>
      </S.OthersCardInfoContainer>
      <Button text="확인" onClick={onClose} />
    </SlideUpModal>
  );
};

export default OthersCardModal;
