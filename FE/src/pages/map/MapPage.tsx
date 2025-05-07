import { useState, useEffect, useRef } from 'react';

import * as S from './MapStyle';
import PlaceSearchInput from './components/PlaceSearchInput';
import AlarmButton from './components/AlarmButton';
import MyCard from './components/MyCard';
import OthersCard from './components/OthersCard';
import { ReturnIcon, RefreshIcon2, Wonyoung1 } from '@/assets/assets';
import SlideUpModal from '@/components/common/SlideUpModal';
import Button from '@/components/common/Button';
import { CameraIcon } from '@/assets/assets';

const MapPage = () => {
  const [spinning, setSpinning] = useState(false);
  const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
  const [isMyCardModalOpen, setIsMyCardModalOpen] = useState(false);
  const [isOtherCardModalOpen, setIsOtherCardModalOpen] = useState(false);
  const [range, setRange] = useState(100);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState(1);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleRefreshClick = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 300);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleNextClick = () => {
    setModalStep(modalStep + 1);
  };

  const handleCloseModal = () => {
    setIsMyCardModalOpen(false);
    setIsOtherCardModalOpen(false);
    setModalStep(1);
  };

  useEffect(() => {
    if (window.naver && mapRef.current) {
      const location = new window.naver.maps.LatLng(37.52133, 126.9522);
      const map = new window.naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
        zoomControl: false,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
        mapTypeControl: false,
        mapTypeControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
        scaleControl: false,
        streetViewControl: false,
        mapDataControl: false,
        draggable: true,
        pinchZoom: true,
        scrollWheel: true,
        keyboardShortcuts: true,
        disableDoubleTapZoom: false,
        disableDoubleClickZoom: false,
        disableTwoFingerTapZoom: false,
        tileTransition: true,
        tileQuality: 'high',
        mapTypeId: window.naver.maps.MapTypeId.NORMAL,
      });

      new window.naver.maps.Marker({
        map,
        position: location,
        animation: window.naver.maps.Animation.DROP,
      });
    }
  }, []);

  return (
    <S.MapContainer ref={mapRef}>
      <S.PageItemContainer>
        <S.MapHeaderContainer>
          <PlaceSearchInput />
          <AlarmButton />
        </S.MapHeaderContainer>
        <S.ExchangeCardContainer>
          <MyCard onClick={() => setIsMyCardModalOpen(true)} />
          <OthersCard onClick={() => setIsOtherCardModalOpen(true)} />
        </S.ExchangeCardContainer>
      </S.PageItemContainer>

      <S.ButtonsContainer>
        <S.ButtonContainer>
          <S.ReturnButton src={ReturnIcon} />
        </S.ButtonContainer>
        <S.ButtonContainer onClick={handleRefreshClick}>
          <S.RefreshButton src={RefreshIcon2} $spinning={spinning} />
        </S.ButtonContainer>
      </S.ButtonsContainer>

      <S.RangeButtonContainer onClick={() => setIsRangeModalOpen(true)}>
        <S.RangeButton>반경 설정</S.RangeButton>
      </S.RangeButtonContainer>

      {/* 나의 포카 모달 */}
      <SlideUpModal header="나의 포카" isOpen={isMyCardModalOpen} onClose={handleCloseModal}>
        {modalStep === 1 ? (
          <>
            <S.MyCardModalText>교환하고 싶은 나의 포카를 촬영해주세요</S.MyCardModalText>
            <S.MyCardImageWrapper>
              <S.MyCardImageLabel>
                <S.MyCardImageInput type="file" accept="image/*" onChange={handleImageUpload} />
                {selectedImage ? (
                  <S.UploadedImage src={selectedImage} alt="업로드 포카" />
                ) : (
                  <S.MyCardImageContainer>
                    <S.MyCardImageIcon src={CameraIcon} />
                  </S.MyCardImageContainer>
                )}
              </S.MyCardImageLabel>
            </S.MyCardImageWrapper>
            <Button text="다음" onClick={handleNextClick} />
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
            <Button text="다음" onClick={handleNextClick} />
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
            <Button text="등록하기" onClick={handleCloseModal} />
          </>
        )}
      </SlideUpModal>

      {/* 원하는 포카 모달 */}
      <SlideUpModal
        header="원하는 포카"
        isOpen={isOtherCardModalOpen}
        onClose={() => setIsOtherCardModalOpen(false)}
      >
        <S.OtherCardModalText>교환하고 싶은 포카를 선택해주세요</S.OtherCardModalText>
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
        <Button text="확인" onClick={handleCloseModal} />
      </SlideUpModal>

      {/* 반경 설정 모달 */}
      <SlideUpModal
        header="반경 설정"
        isOpen={isRangeModalOpen}
        onClose={() => setIsRangeModalOpen(false)}
      >
        <S.RangeModalText>근처에서 포케터를 검색할 반경을 선택해주세요</S.RangeModalText>
        <S.RangeContainer>
          <S.Range100 $selected={range === 100} onClick={() => setRange(100)}>
            100m
          </S.Range100>
          <S.Range300 $selected={range === 300} onClick={() => setRange(300)}>
            300m
          </S.Range300>
          <S.Range500 $selected={range === 500} onClick={() => setRange(500)}>
            500m
          </S.Range500>
        </S.RangeContainer>
      </SlideUpModal>
    </S.MapContainer>
  );
};

export default MapPage;
