import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import * as S from './MapStyle';
import { colors } from '@/styles/theme';

import { CameraIcon, ReturnIcon, RefreshIcon2, Wonyoung1 } from '@/assets/assets';
import PlaceSearchInput from './components/PlaceSearchInput';
import AlarmButton from './components/AlarmButton';
import MyCard from './components/MyCard';
import OthersCard from './components/OthersCard';
import SlideUpModal from '@/components/common/SlideUpModal';
import Button from '@/components/common/Button';
import { exchangeList } from '@/mocks/exchange-list';
import PocketCallButton from './components/PocketCallButton';
import Toast from './components/Toast';

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

  const handleReturnClick = () => {
    if (naverMapRef.current && currentLocation) {
      const location = new window.naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
      naverMapRef.current.morph(location, 17);
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

      {/* 교환 목록 모달 */}
      <SlideUpModal
        header="거래중인 포케터"
        isOpen={isExchangeListModalOpen}
        onClose={() => setIsExchangeListModalOpen(false)}
      >
        <S.ExchangeModalSecondHeader>
          <S.ExchangeModalSecondHeaderText>
            근처에서 교환을 신청할 포케터를 {`\n`}선택해주세요
          </S.ExchangeModalSecondHeaderText>
          <S.ExchangeListRefreshButton
            src={RefreshIcon2}
            onClick={handleRefreshClick}
            $spinning={spinning}
          />
        </S.ExchangeModalSecondHeader>
        <S.ExchangeModalThirdHeader>
          <S.ExchangeModalThirdHeaderLeft>
            포켓콜은 3분마다 최대 5번 보낼 수 있어요
          </S.ExchangeModalThirdHeaderLeft>
          <S.ExchangeModalThirdHeaderRight $isMax={pocketCallCount === 5}>
            {pocketCallCount} /5
          </S.ExchangeModalThirdHeaderRight>
        </S.ExchangeModalThirdHeader>
        <S.ExchangeUserListContainer>
          {filteredList.map((user, index) => (
            <React.Fragment key={user.userId}>
              <S.ExchangeUserList>
                <S.ExchangeUserLeft>
                  <S.ExchangeCardImage src={user.card.imageUrl} />
                  <S.ExchangeUserName>{user.nickname}</S.ExchangeUserName>
                </S.ExchangeUserLeft>
                <PocketCallButton onClick={handlePocketCall} disabled={pocketCallCount >= 5} />
              </S.ExchangeUserList>
              {index !== filteredList.length - 1 && <S.Divider />}
            </React.Fragment>
          ))}
        </S.ExchangeUserListContainer>
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
