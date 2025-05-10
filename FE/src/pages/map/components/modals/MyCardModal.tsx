import * as S from './MyCardStyle';
import SlideUpModal from '@/components/common/SlideUpModal';
import { CameraIcon } from '@/assets/assets';
import Button from '@/components/common/Button';
import { Wonyoung1 } from '@/assets/assets';

interface MyCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalStep: number;
  selectedImage: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const MyCardModal = ({
  isOpen,
  onClose,
  modalStep,
  selectedImage,
  onImageUpload,
  onClick,
}: MyCardModalProps) => {
  return (
    <SlideUpModal header="나의 포카" isOpen={isOpen} onClose={onClose}>
      {modalStep === 1 ? (
        <>
          <S.MyCardModalText>교환하고 싶은 나의 포카를 촬영해주세요</S.MyCardModalText>
          <S.MyCardImageWrapper>
            <S.MyCardImageLabel>
              <S.MyCardImageInput type="file" accept="image/*" onChange={onImageUpload} />
              {selectedImage ? (
                <S.UploadedImage src={selectedImage} alt="업로드 포카" />
              ) : (
                <S.MyCardImageContainer>
                  <S.MyCardImageIcon src={CameraIcon} />
                </S.MyCardImageContainer>
              )}
            </S.MyCardImageLabel>
          </S.MyCardImageWrapper>
          <Button text="다음" onClick={onClick} />
        </>
      ) : modalStep === 2 ? (
        <>
          <S.MyCardModalText>포카 정보를 선택해주세요</S.MyCardModalText>
          <S.MyCardInfoContainer>
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
          </S.MyCardInfoContainer>
          <Button text="다음" onClick={onClick} />
        </>
      ) : (
        <>
          <S.MyCardModalText>포카 정보를 확인하고 등록해주세요</S.MyCardModalText>
          <S.MyCardResultContainer>
            <S.MyCardResultImage src={Wonyoung1} />
            <S.MyCardResultTextContainer>
              <S.MyCardResultText>
                <S.MyCardResultHeader>그룹명</S.MyCardResultHeader>
                <S.MyCardResultContent>아이브</S.MyCardResultContent>
              </S.MyCardResultText>
              <S.MyCardResultText>
                <S.MyCardResultHeader>멤버명</S.MyCardResultHeader>
                <S.MyCardResultContent>장원영</S.MyCardResultContent>
              </S.MyCardResultText>
              <S.MyCardResultText>
                <S.MyCardResultHeader>앨범명</S.MyCardResultHeader>
                <S.MyCardResultContent>Album</S.MyCardResultContent>
              </S.MyCardResultText>
            </S.MyCardResultTextContainer>
          </S.MyCardResultContainer>
          <Button text="등록하기" onClick={onClose} />
        </>
      )}
    </SlideUpModal>
  );
};

export default MyCardModal;
