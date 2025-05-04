// OptionSection.tsx
import React, { useState, ChangeEvent } from 'react';
import * as S from './OptionSectionStyle';
import { IncreaseIcon, DecreaseIcon, AverageIcon } from '@/assets/assets';
import PhotocardSettingModal from './PhotocardSettingModal';

interface PhotocardSettingData {
  group: string;
  member: string;
  album: string;
  version: string;
}

const OptionSection: React.FC = () => {
  const [price, setPrice] = useState<string>('');
  const [showMarketPrice, setShowMarketPrice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhotocard, setSelectedPhotocard] = useState<PhotocardSettingData>({
    group: '',
    member: '',
    album: '',
    version: '',
  });

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 숫자만 남기기
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setPrice(raw);
  };

  const handlePriceBlur = () => {
    if (price) {
      setPrice(Number(price).toLocaleString());
    }
  };

  const handlePriceFocus = () => {
    setPrice(price.replace(/,/g, ''));
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

  const handlePhotocardConfirm = (data: PhotocardSettingData) => {
    setSelectedPhotocard(data);
    setIsModalOpen(false);
  };

  return (
    <S.Container>
      <S.OptionRow>
        <S.Label>아티스트</S.Label>
        <S.ChipsWrapper>
          <S.Chip selected={!!selectedPhotocard.group} clickable onClick={handleModalOpen}>
            {selectedPhotocard.group || '선택'}
          </S.Chip>
          {selectedPhotocard.member && (
            <S.Chip selected clickable>
              {selectedPhotocard.member}
            </S.Chip>
          )}
        </S.ChipsWrapper>
      </S.OptionRow>

      <S.OptionRow>
        <S.Label>앨범</S.Label>
        <S.ChipsWrapper>
          <S.Chip selected={!!selectedPhotocard.album} clickable onClick={handleModalOpen}>
            {selectedPhotocard.album || '선택'}
          </S.Chip>
        </S.ChipsWrapper>
      </S.OptionRow>

      <S.OptionRow>
        <S.Label>버전</S.Label>
        <S.ChipsWrapper>
          <S.Chip selected={!!selectedPhotocard.version} clickable onClick={handleModalOpen}>
            {selectedPhotocard.version || '선택'}
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
              value={price}
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
};

export default OptionSection;
