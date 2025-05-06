import { useState, useEffect, useRef } from 'react';

import * as S from './MapStyle';
import PlaceSearchInput from './components/PlaceSearchInput';
import AlarmButton from './components/AlarmButton';
import MyCard from './components/MyCard';
import OthersCard from './components/OthersCard';
import { ReturnIcon, RefreshIcon2 } from '@/assets/assets';
import SlideUpModal from '@/components/common/SlideUpModal';

const MapPage = () => {
  const [spinning, setSpinning] = useState(false);
  const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
  const [isMyCardModalOpen, setIsMyCardModalOpen] = useState(false);
  const [range, setRange] = useState(100);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleRefreshClick = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 300);
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
          <OthersCard />
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
      <SlideUpModal
        header="나의 포카"
        isOpen={isMyCardModalOpen}
        onClose={() => setIsMyCardModalOpen(false)}
      >
        <S.MyCardModalText>교환하고 싶은 나의 포카를 촬영해주세요</S.MyCardModalText>
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
