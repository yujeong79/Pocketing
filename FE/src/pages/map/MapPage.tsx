import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import * as S from './MapStyle';
import { colors } from '@/styles/theme';

import { ReturnIcon, RefreshIcon2 } from '@/assets/assets';
import PlaceSearchInput from './components/common/PlaceSearchInput';
import AlarmButton from './components/buttons/AlarmButton';
import MyCard from './components/common/MyCard';
import OthersCard from './components/common/OthersCard';
import { exchangeList } from '@/mocks/exchange-list';
import Toast from './components/common/Toast';

import MyCardModal from './components/modals/MyCardModal';
import OthersCardModal from './components/modals/OthersCardModal';
import ExchangeListModal from './components/modals/ExchangeListModal';
import SetRangeModal from './components/modals/SetRangeModal';

const MapPage = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
  const [isMyCardModalOpen, setIsMyCardModalOpen] = useState(false);
  const [isOtherCardModalOpen, setIsOtherCardModalOpen] = useState(false);
  const [range, setRange] = useState(100);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState(1);
  const [isExchangeListModalOpen, setIsExchangeListModalOpen] = useState(false);
  const [pocketCallCount, setPocketCallCount] = useState(0);
  const [showMaxToast, setShowMaxToast] = useState(false);
  const [showSendToast, setShowSendToast] = useState(false);

  const circleRef = useRef<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<any>(null);

  const filteredList = useMemo(
    () => exchangeList.filter((user) => user.distance <= range),
    [range]
  );
  const CountfilteredList = filteredList.length;

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
    setIsRangeModalOpen(false);
    setIsExchangeListModalOpen(false);
    setModalStep(1);
  };

  const handlePocketCall = () => {
    if (pocketCallCount < 5) {
      setPocketCallCount((prev) => prev + 1);
      setShowSendToast(true);
    } else {
      setShowMaxToast(true);
    }
  };

  const getZoomLevel = (range: number) => {
    switch (range) {
      case 100:
        return 17;
      case 300:
        return 16;
      case 500:
        return 15;
    }
  };

  const handleReturnClick = () => {
    if (naverMapRef.current && currentLocation) {
      const location = new window.naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
      naverMapRef.current.morph(location, getZoomLevel(range));
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('위치 정보를 가져오는데 실패했습니다:', error);
          // 기본 위치 설정 (멀티캠퍼스)
          setCurrentLocation({ lat: 37.501286, lng: 127.0396029 });
        }
      );
    }
  }, []);

  useEffect(() => {
    if (window.naver && mapRef.current && currentLocation) {
      const location = new window.naver.maps.LatLng(currentLocation.lat, currentLocation.lng);

      // 지도 생성
      const map = new window.naver.maps.Map(mapRef.current, {
        center: location,
        zoom: getZoomLevel(range),
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

      naverMapRef.current = map; // 지도 객체 저장

      // 마커 생성
      const marker = new window.naver.maps.Marker({
        map,
        position: location,
        icon: S.createMarkerIcon(),
        animation: window.naver.maps.Animation.DROP,
        zIndex: 100,
      });

      marker.setMap(map);

      // 기존 원형 영역이 있다면 제거
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }

      // 새로운 원형 영역 생성
      circleRef.current = new window.naver.maps.Circle({
        map,
        center: location,
        radius: range,
        fillColor: colors.primary,
        fillOpacity: 0.1,
        strokeColor: colors.primary,
        strokeWeight: 2,
        strokeOpacity: 0.5,
        strokeStyle: 'solid',
        clickable: false,
        zIndex: 50,
      });

      const countMarker = new window.naver.maps.Marker({
        map,
        position: location,
        icon: {
          content: `
            <div style="
              background-color: ${colors.primary};
              color: white;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: bold;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              transform: translate(-50%, 20px);
              white-space: nowrap;
            ">
              ${CountfilteredList}명
            </div>
          `,
          size: new window.naver.maps.Size(0, 0),
          anchor: new window.naver.maps.Point(0, 0),
        },
        zIndex: 99,
      });

      window.naver.maps.Event.addListener(countMarker, 'click', () => {
        setIsExchangeListModalOpen(true);
      });
    }
  }, [currentLocation, range]);

  return (
    <S.MapContainer ref={mapRef}>
      <S.PageItemContainer>
        <S.MapHeaderContainer>
          <PlaceSearchInput />
          <AlarmButton onClick={() => navigate('/alarm')} />
        </S.MapHeaderContainer>
        <S.ExchangeCardContainer>
          <MyCard onClick={() => setIsMyCardModalOpen(true)} />
          <OthersCard onClick={() => setIsOtherCardModalOpen(true)} />
        </S.ExchangeCardContainer>
      </S.PageItemContainer>

      <S.ButtonsContainer>
        <S.ButtonContainer>
          <S.ReturnButton src={ReturnIcon} onClick={handleReturnClick} />
        </S.ButtonContainer>
        <S.ButtonContainer onClick={handleRefreshClick}>
          <S.RefreshButton src={RefreshIcon2} $spinning={spinning} />
        </S.ButtonContainer>
      </S.ButtonsContainer>

      <S.RangeButtonContainer onClick={() => setIsRangeModalOpen(true)}>
        <S.RangeButton>반경 설정</S.RangeButton>
      </S.RangeButtonContainer>

      <MyCardModal
        isOpen={isMyCardModalOpen}
        onClose={handleCloseModal}
        modalStep={modalStep}
        selectedImage={selectedImage}
        onImageUpload={handleImageUpload}
        onClick={handleNextClick}
      />

      <OthersCardModal isOpen={isOtherCardModalOpen} onClose={handleCloseModal} />

      <ExchangeListModal
        isOpen={isExchangeListModalOpen}
        onClose={handleCloseModal}
        filteredList={filteredList}
        onPocketCall={handlePocketCall}
        onRefreshClick={handleRefreshClick}
        pocketCallCount={pocketCallCount}
        spinning={spinning}
      />

      <SetRangeModal
        isOpen={isRangeModalOpen}
        onClose={handleCloseModal}
        range={range}
        onRangeChange={setRange}
      />

      {showMaxToast && (
        <Toast
          type="warning"
          message="포켓콜은 3분마다 최대 5개까지 보낼 수 있어요!"
          onClose={() => setShowMaxToast(false)}
        />
      )}
      {showSendToast && (
        <Toast
          type="success"
          message="포켓콜을 보냈어요! 포케터의 수락을 기다리세요!"
          onClose={() => setShowSendToast(false)}
        />
      )}
    </S.MapContainer>
  );
};

export default MapPage;
