// OptionSection.tsx
import React, { useState, ChangeEvent, useMemo, forwardRef, useImperativeHandle } from 'react';
import * as S from './OptionSectionStyle';
import { IncreaseIcon, DecreaseIcon, AverageIcon } from '@/assets/assets';
import PhotocardSettingModal from './PhotocardSettingModal';
import ImageCarousel from './ImageCarousel';

interface PhotocardSettingData {
  group: string;
  member: string;
  album: string;
  version: string;
  price: string;
}

interface OptionSectionHandle {
  photocardSettings: PhotocardSettingData[];
}

const OptionSection = forwardRef<OptionSectionHandle>((_, ref) => {
  const [showMarketPrice, setShowMarketPrice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [photocardSettings, setPhotocardSettings] = useState<PhotocardSettingData[]>([
    { group: '', member: '', album: '', version: '', price: '' },
    { group: '', member: '', album: '', version: '', price: '' },
    { group: '', member: '', album: '', version: '', price: '' },
  ]);

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

  const handleMarketPriceClick = () => {
    setShowMarketPrice(!showMarketPrice);
  };

  const handleModalOpen = () => {
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
    setCurrentImageIndex(index);
  };

  const currentPhotocard = photocardSettings[currentImageIndex];

  const optionCompleteStatus = useMemo(() => {
    return photocardSettings.map((settings) =>
      Boolean(
        settings.group && settings.member && settings.album && settings.version && settings.price
      )
    );
  }, [photocardSettings]);

  return (
    <S.Container>
      <ImageCarousel
        onImageChange={handleImageChange}
        optionCompleteStatus={optionCompleteStatus}
      />

      <S.OptionRow>
        <S.Label>아티스트</S.Label>
        <S.ChipsWrapper>
          <S.Chip selected={!!currentPhotocard.group} clickable onClick={handleModalOpen}>
            {currentPhotocard.group || '선택'}
          </S.Chip>
          {currentPhotocard.member && (
            <S.Chip selected clickable>
              {currentPhotocard.member}
            </S.Chip>
          )}
        </S.ChipsWrapper>
      </S.OptionRow>

      <S.OptionRow>
        <S.Label>앨범</S.Label>
        <S.ChipsWrapper>
          <S.Chip selected={!!currentPhotocard.album} clickable onClick={handleModalOpen}>
            {currentPhotocard.album || '선택'}
          </S.Chip>
        </S.ChipsWrapper>
      </S.OptionRow>

      <S.OptionRow>
        <S.Label>버전</S.Label>
        <S.ChipsWrapper>
          <S.Chip selected={!!currentPhotocard.version} clickable onClick={handleModalOpen}>
            {currentPhotocard.version || '선택'}
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
            {showMarketPrice && (
              <S.PriceInfoContainer>
                <S.PriceInfoRow>
                  <img src={DecreaseIcon} alt="최저가" />
                  최저가
                  <S.PriceValue>20,000원</S.PriceValue>
                </S.PriceInfoRow>
                <S.PriceInfoRow>
                  <img src={AverageIcon} alt="평균가" />
                  평균가
                  <S.PriceValue>23,000원</S.PriceValue>
                </S.PriceInfoRow>
                <S.PriceInfoRow>
                  <img src={IncreaseIcon} alt="최고가" />
                  최고가
                  <S.PriceValue>27,000원</S.PriceValue>
                </S.PriceInfoRow>
              </S.PriceInfoContainer>
            )}
          </S.MarketPriceContainer>
        </S.PriceSection>
      </S.OptionRow>

      <PhotocardSettingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handlePhotocardConfirm}
      />
    </S.Container>
  );
});

OptionSection.displayName = 'OptionSection';

export default OptionSection;
