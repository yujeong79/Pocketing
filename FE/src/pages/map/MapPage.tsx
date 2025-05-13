import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './MapStyle';
import { colors } from '@/styles/theme';

import PlaceSearchInput from './components/common/PlaceSearchInput';
import AlarmButton from './components/buttons/AlarmButton';
import MyCard from './components/common/MyCard';
import OthersCard from './components/common/OthersCard';
import MyCardModal from './components/modals/MyCardModal';
import OthersCardModal from './components/modals/OthersCardModal';
import ExchangeListModal from './components/modals/ExchangeListModal';
import SetRangeModal from './components/modals/SetRangeModal';
import Toast from './components/common/Toast';
import { ReturnIcon, RefreshIcon2 } from '@/assets/assets';
import { postLocation } from '@/api/exchange/location';
import { getExchangeUserList } from '@/api/exchange/exchangeUserList';
import { Exchange } from '@/types/exchange';
import { LocationRequest } from '@/types/location';

const MapPage = () => {
  const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
  const [isMyCardModalOpen, setIsMyCardModalOpen] = useState(false);
  const [isOtherCardModalOpen, setIsOtherCardModalOpen] = useState(false);
  const [isExchangeListModalOpen, setIsExchangeListModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [range, setRange] = useState(100);
  const [showEmptyToast, setShowEmptyToast] = useState(false);
  const [currentUsers, setCurrentUsers] = useState(0);
  const [userList, setUserList] = useState<Exchange[]>([]);
  const navigate = useNavigate();
  const circleRef = useRef<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<any>(null);
  const countMarkerRef = useRef<any>(null);

  const handleGetUserList = useCallback(async () => {
    try {
      const response = await getExchangeUserList(range);
      setCurrentUsers(response.result.length);
      setUserList(response.result);
      if (!response.isSuccess) {
        setShowEmptyToast(true);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }, [range]);

  const handlePostLocation = useCallback(async () => {
    try {
      const PostLocationData: LocationRequest = {
        latitude: currentLocation?.lat ?? 37.501286,
        longitude: currentLocation?.lng ?? 127.0396029,
        isAutoDetected: true,
        locationName: null,
      };
      const response = await postLocation(PostLocationData);
      console.log(response);
    } catch (error) {
      throw error;
    }
  }, [currentLocation]);

  useEffect(() => {
    if (currentLocation) {
      handlePostLocation();
      handleGetUserList();
    }
  }, [currentLocation, handlePostLocation, handleGetUserList]);

  const handleRefreshClick = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 300);
    handlePostLocation();
    handleGetUserList();
  };

  const handleCloseModal = () => {
    setIsMyCardModalOpen(false);
    setIsOtherCardModalOpen(false);
    setIsRangeModalOpen(false);
    setIsExchangeListModalOpen(false);
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
          throw error;
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

      naverMapRef.current = map;

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

      // 기존 카운트 마커가 있다면 제거
      if (countMarkerRef.current) {
        countMarkerRef.current.setMap(null);
      }

      // 새로운 카운트 마커 생성
      countMarkerRef.current = new window.naver.maps.Marker({
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
              ${currentUsers}명
            </div>
          `,
          size: new window.naver.maps.Size(0, 0),
          anchor: new window.naver.maps.Point(0, 0),
        },
        zIndex: 99,
      });

      window.naver.maps.Event.addListener(countMarkerRef.current, 'click', () => {
        setIsExchangeListModalOpen(true);
      });
    }
  }, [currentLocation, range, currentUsers]);

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
        onRefresh={handleGetUserList}
      />
      <OthersCardModal
        isOpen={isOtherCardModalOpen}
        onClose={handleCloseModal}
        onRefresh={handleGetUserList}
      />
      <ExchangeListModal
        isOpen={isExchangeListModalOpen}
        onClose={handleCloseModal}
        filteredList={userList}
        onRefresh={handleRefreshClick}
      />
      <SetRangeModal
        isOpen={isRangeModalOpen}
        onClose={handleCloseModal}
        range={range}
        onRangeChange={setRange}
      />

      {showEmptyToast && (
        <Toast
          type="warning"
          message="카드 등록을 먼저 해주세요!"
          onClose={() => setShowEmptyToast(false)}
        />
      )}
    </S.MapContainer>
  );
};

export default MapPage;
