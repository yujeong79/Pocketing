import { useState, useEffect, useRef } from 'react';

import * as S from './MapStyle';
import PlaceSearchInput from './components/PlaceSearchInput';
import AlarmButton from './components/AlarmButton';
import MyCard from './components/MyCard';
import OthersCard from './components/OthersCard';
import { ReturnIcon, RefreshIcon2 } from '@/assets/assets';

const MapPage = () => {
  const [spinning, setSpinning] = useState(false);
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
          <MyCard />
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

      <S.RangeButtonContainer>
        <S.RangeButton>반경 설정</S.RangeButton>
      </S.RangeButtonContainer>
    </S.MapContainer>
  );
};

export default MapPage;
