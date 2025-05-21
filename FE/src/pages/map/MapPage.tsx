import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

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
import { useNotification } from '@/hooks/notification/useNotification';
import { useGlobalStore } from '@/store/globalStore';

const MapPage = () => {
  const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
  const [isMyCardModalOpen, setIsMyCardModalOpen] = useState(false);
  const [isOtherCardModalOpen, setIsOtherCardModalOpen] = useState(false);
  const [isExchangeListModalOpen, setIsExchangeListModalOpen] = useState(false);
  const [isMapMoved, setIsMapMoved] = useState(false);

  const [currentUsers, setCurrentUsers] = useState(0);
  const [userList, setUserList] = useState<Exchange[]>([]);

  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [range, setRange] = useState(100);
  const [showEmptyToast, setShowEmptyToast] = useState(false);

  const { fetchNotification } = useNotification();
  const { isNotificationLoading, setIsNotificationLoading } = useGlobalStore();

  const navigate = useNavigate();
  const markerRef = useRef<any>(null);
  const countMarkerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<any>(null);

  // 두 좌표 사이의 거리를 계산하는 함수 (Haversine 공식)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // 지구의 반경 (미터)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 미터 단위로 반환
  };

  const handleGetUserList = useCallback(async () => {
    const response = await getExchangeUserList(range);
    const filteredList = response.result.filter(
      (user) => user.requestStatus === 'PENDING' || user.requestStatus === null
    );

    setCurrentUsers(filteredList.length);
    setUserList(filteredList);

    if (!response.isSuccess) {
      setShowEmptyToast(true);
      return null;
    }
  }, [range]);

  // 위치 추적 설정
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // 이전 위치와 비교하여 실제 변경이 있을 때만 업데이트
        setCurrentLocation((prev) => {
          if (prev?.lat === latitude && prev?.lng === longitude) {
            return prev;
          }
          return { lat: latitude, lng: longitude };
        });
      },
      (error) => {
        // 기본 위치 설정
        setCurrentLocation({ lat: 37.501286, lng: 127.0396029 });
        throw error;
      },
      {
        enableHighAccuracy: true, // 정확한 위치 정보 사용
        maximumAge: 30000, // 30초 이내의 캐시된 위치 정보 허용
        timeout: 5000, // 5초 타임아웃
      }
    );

    // 컴포넌트 언마운트 시 위치 추적 중지
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 위치 데이터 서버 전송 (디바운스 적용)
  const debouncedPostLocation = useCallback(
    debounce(async (location: { lat: number; lng: number }) => {
      // 지도가 이동된 상태면 위치 전송하지 않음
      if (isMapMoved) return;

      const PostLocationData: LocationRequest = {
        latitude: location.lat,
        longitude: location.lng,
        isAutoDetected: true,
        locationName: null,
      };
      await postLocation(PostLocationData);
      await handleGetUserList();
    }, 1000),
    [isMapMoved, handleGetUserList]
  );

  // 위치 변경 시 디바운스된 함수 호출
  useEffect(() => {
    if (currentLocation) {
      debouncedPostLocation(currentLocation);
    }
  }, [currentLocation, debouncedPostLocation]);

  const handleRefreshClick = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 300);
    if (currentLocation) {
      debouncedPostLocation(currentLocation);
    }
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

  const handleSelectPlace = useCallback(
    (lat: number, lng: number) => {
      if (naverMapRef.current) {
        const location = new window.naver.maps.LatLng(lat, lng);
        naverMapRef.current.morph(location, getZoomLevel(range));
      }
    },
    [range]
  );

  const handleReturnClick = useCallback(() => {
    setIsMapMoved(false);
    if (currentLocation) {
      const location = new window.naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
      naverMapRef.current.morph(location, getZoomLevel(range));
    }
  }, [currentLocation, range]);

  useEffect(() => {
    if (window.naver && mapRef.current && currentLocation) {
      const location = new window.naver.maps.LatLng(currentLocation.lat, currentLocation.lng);

      // 지도가 없을 때만 새로 생성
      if (!naverMapRef.current) {
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

        // 지도 이동 이벤트 리스너 추가
        window.naver.maps.Event.addListener(map, 'center_changed', () => {
          if (!currentLocation) return;

          const center = map.getCenter();
          const distance = calculateDistance(
            currentLocation.lat,
            currentLocation.lng,
            center.y,
            center.x
          );

          setIsMapMoved(distance > 50);
        });

        // 마커 최초 생성 (한 번만 실행)
        markerRef.current = new window.naver.maps.Marker({
          map,
          position: location,
          icon: S.createMarkerIcon(),
          animation: window.naver.maps.Animation.DROP, // 최초 생성 시에만 애니메이션 적용
          zIndex: 100,
        });

        // 카운트 마커 최초 생성
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

        // 카운트 마커 클릭 이벤트
        window.naver.maps.Event.addListener(countMarkerRef.current, 'click', () => {
          setIsExchangeListModalOpen(true);
        });
      } else {
        // 지도가 이미 존재하면 위치만 업데이트 (지도가 이동되지 않은 상태일 때만)
        if (!isMapMoved) {
          naverMapRef.current.setCenter(location);
          naverMapRef.current.setZoom(getZoomLevel(range));
        }

        // 마커 위치 업데이트 (애니메이션 없이)
        if (markerRef.current) {
          markerRef.current.setPosition(location);
        }

        // 카운트 마커 위치와 내용 업데이트
        if (countMarkerRef.current) {
          countMarkerRef.current.setPosition(location);
          countMarkerRef.current.setIcon({
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
          });
        }
      }

      // 원형 영역은 매번 새로 생성 (반경이 변경될 수 있으므로)
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }

      circleRef.current = new window.naver.maps.Circle({
        map: naverMapRef.current,
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
    }
  }, [currentLocation, range, currentUsers, isMapMoved]);

  useEffect(() => {
    if (!isNotificationLoading) {
      fetchNotification();
      setIsNotificationLoading(true);
    }
  }, [isNotificationLoading, fetchNotification, setIsNotificationLoading]);

  return (
    <S.MapContainer>
      <S.MapWrapper ref={mapRef} />
      <S.PageItemContainer>
        <S.MapHeaderContainer>
          <PlaceSearchInput onSelectPlace={handleSelectPlace} />
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
