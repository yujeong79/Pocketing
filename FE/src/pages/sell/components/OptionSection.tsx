// OptionSection.tsx
import { useState, ChangeEvent, useMemo, forwardRef, useImperativeHandle } from 'react';
import * as S from './OptionSectionStyle';
import { IncreaseIcon, DecreaseIcon, AverageIcon } from '@/assets/assets';
import PhotocardSettingModal from './PhotocardSettingModal';
import ImageCarousel from './ImageCarousel';
import { getPhotoCardPrice } from '@/api/postRegistration/price';
import CautionModal from './CautionModal';

interface PhotocardSettingData {
  groupId?: number;
  group: string;

  memberId?: number;
  member: string;

  albumId?: number;   // ⬅ 나중에 앨범 API 연동되면 바로 채워짐
  album: string;

  versionId?: string; // ⬅ 예: ver1, ver2 같이 string이면 string
  version: string;

  price: string;
}


interface OptionSectionHandle {
  photocardSettings: PhotocardSettingData[];
}

interface OptionSectionProps {
  initialSettings: PhotocardSettingData[];
  imageList: string[];
}


const OptionSection = forwardRef<OptionSectionHandle, OptionSectionProps>(
  ({ initialSettings, imageList }, ref) => {
    const [showMarketPrice, setShowMarketPrice] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [photocardSettings, setPhotocardSettings] = useState<PhotocardSettingData[]>(
      initialSettings
    );

    const [marketPrice, setMarketPrice] = useState<{
      minPrice: number;
      maxPrice: number;
      avgPrice: number;
    } | null>(null);


    useImperativeHandle(ref, () => ({
      photocardSettings,
    }));


  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setPhotocardSettings((prev) => {
      const newSettings = [...prev];
      newSettings[currentImageIndex] = {
        ...newSettings[currentImageIndex],
        price: raw,
      };
      return newSettings;
    });
  };

  const handlePriceBlur = () => {
    const currentPrice = photocardSettings[currentImageIndex].price;
    if (currentPrice) {
      setPhotocardSettings((prev) => {
        const newSettings = [...prev];
        newSettings[currentImageIndex] = {
          ...newSettings[currentImageIndex],
          price: Number(currentPrice).toLocaleString(),
        };
        return newSettings;
      });
    }
  };

  const handlePriceFocus = () => {
    const currentPrice = photocardSettings[currentImageIndex].price;
    setPhotocardSettings((prev) => {
      const newSettings = [...prev];
      newSettings[currentImageIndex] = {
        ...newSettings[currentImageIndex],
        price: currentPrice.replace(/,/g, ''),
      };
      return newSettings;
    });
  };

  const [isCautionModalOpen, setIsCautionModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalIconType, setModalIconType] = useState<'caution' | 'success'>();

  const handleMarketPriceClick = async () => {
    const current = photocardSettings[currentImageIndex];
    if (!current.versionId) {
      setModalTitle('포토카드 미선택');
      setModalMessage('포토카드를 먼저 선택해주세요.');
      setModalIconType('caution'); 
      setIsCautionModalOpen(true);
      return;
    }

    setMarketPrice(null);
    setShowMarketPrice(false);

   try {
      const res = await getPhotoCardPrice(Number(current.versionId));
      setMarketPrice(res.result);
      setShowMarketPrice(true);
    } catch (error: any) {
      console.error('시세 조회 실패:', error);
      if (error.response?.data?.code === 'PRICE4002') {
        setModalTitle('시세 정보 없음');
        setModalMessage('해당 포토카드는\n 아직 시세 정보가 없습니다.');
        setModalIconType('caution'); 
        setIsCautionModalOpen(true);
      } else {
        setModalTitle('시세 조회 실패');
        setModalMessage('시세 조회에 실패했습니다.');
        setModalIconType('caution'); 
        setIsCautionModalOpen(true);
      }
    }

  };

  const [modalSection, setModalSection] = useState<'group' | 'member' | 'album' | 'version'>('group');


  const handleModalOpen = (section: 'group' | 'member' | 'album') => {
    const current = photocardSettings[currentImageIndex];

    if (section === 'member' && !current.groupId) {
        setModalTitle('그룹 미선택');
        setModalMessage('먼저 그룹을 선택해주세요.');
        setModalIconType('caution'); 
        setIsCautionModalOpen(true);
        return;
      }


    if (section === 'album' && (!current.groupId || !current.memberId)) {
        setModalTitle('정보 누락');
        setModalMessage('먼저 그룹과 멤버를 선택해주세요.');
        setModalIconType('caution'); 
        setIsCautionModalOpen(true);
        return;
      }


    setModalSection(section);     // ✅ 추가
    setIsModalOpen(true);
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePhotocardConfirm = (data: Omit<PhotocardSettingData, 'price'>) => {
    setPhotocardSettings((prev) => {
      const newSettings = [...prev];
      newSettings[currentImageIndex] = {
        ...data,
        price: newSettings[currentImageIndex].price,
      };
      return newSettings;
    });
    setIsModalOpen(false);
  };

  const handleImageChange = (index: number) => {
    if (index !== currentImageIndex) {
      setShowMarketPrice(false);
      setMarketPrice(null);
      setCurrentImageIndex(index);
    }
    
  };

  const optionCompleteStatus = useMemo(() => {
      return photocardSettings.map((settings) =>
        Boolean(
          settings.group && settings.member && settings.album && settings.version && settings.price
        )
      );
    }, [photocardSettings]);

    const currentPhotocard = photocardSettings[currentImageIndex];
return (
      <S.Container>
        <ImageCarousel
          images={imageList}
          onImageChange={handleImageChange}
          optionCompleteStatus={optionCompleteStatus}
        />

      <S.OptionRow>
        <S.Label>아티스트</S.Label>
        <S.ChipsWrapper>
          <S.Chip selected={!!currentPhotocard.group} clickable onClick={() => handleModalOpen('group')}>
            {currentPhotocard.group || '선택'}
          </S.Chip>
          {currentPhotocard.member && (
            <S.Chip selected clickable onClick={() => handleModalOpen('member')}>
              {currentPhotocard.member}
            </S.Chip>
          )}
        </S.ChipsWrapper>
      </S.OptionRow>

      <S.OptionRow>
        <S.Label>앨범</S.Label>
        <S.ChipsWrapper>
          <S.Chip selected={!!currentPhotocard.album} clickable onClick={() => handleModalOpen('album')}>
            {currentPhotocard.album || '선택'}
          </S.Chip>
        </S.ChipsWrapper>
      </S.OptionRow>

      <S.OptionRow>
        <S.PriceSection>
          <S.PriceInputWrapper>
            <S.Label>판매가</S.Label>
            <S.PriceInput
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              value={currentPhotocard.price}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
              onFocus={handlePriceFocus}
            />
            <S.PriceUnit>원</S.PriceUnit>
          </S.PriceInputWrapper>
          <S.MarketPriceContainer>
            <S.MarketPriceButton onClick={handleMarketPriceClick}>
              시세 확인 &gt;
            </S.MarketPriceButton>
              {showMarketPrice && marketPrice && (
                <S.PriceInfoContainer>
                  <S.PriceInfoRow>
                    <img src={DecreaseIcon} alt="최저가" />
                    최저가
                    <S.PriceValue>{marketPrice.minPrice.toLocaleString()}원</S.PriceValue>
                  </S.PriceInfoRow>
                  <S.PriceInfoRow>
                    <img src={AverageIcon} alt="평균가" />
                    평균가
                    <S.PriceValue>{marketPrice.avgPrice.toLocaleString()}원</S.PriceValue>
                  </S.PriceInfoRow>
                  <S.PriceInfoRow>
                    <img src={IncreaseIcon} alt="최고가" />
                    최고가
                    <S.PriceValue>{marketPrice.maxPrice.toLocaleString()}원</S.PriceValue>
                  </S.PriceInfoRow>
                </S.PriceInfoContainer>
              )}
          </S.MarketPriceContainer>
        </S.PriceSection>
      </S.OptionRow>

      <PhotocardSettingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={(data) => handlePhotocardConfirm(data)}
        initialData={{
          groupId: currentPhotocard.groupId,
          group: currentPhotocard.group,
          memberId: currentPhotocard.memberId,
          member: currentPhotocard.member,
          album: currentPhotocard.album,
          version: currentPhotocard.version,
          price: currentPhotocard.price,
        }}
        initialSection={modalSection}
      />
      <CautionModal
        isOpen={isCautionModalOpen}
        onClose={() => setIsCautionModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
        iconType={modalIconType}
      />

    </S.Container>
    
  );
});

OptionSection.displayName = 'OptionSection';

export default OptionSection;
