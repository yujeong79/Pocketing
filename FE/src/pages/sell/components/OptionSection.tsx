// OptionSection.tsx
import React, { useState, ChangeEvent } from 'react';
import * as S from './OptionSectionStyle';
import { IncreaseIcon, DecreaseIcon, AverageIcon } from '@/assets/assets';

const OptionSection: React.FC = () => {
  const [price, setPrice] = useState<string>('');
  const [showMarketPrice, setShowMarketPrice] = useState(false);

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

  return (
    <S.Container>
      <S.OptionRow>
        <S.Label>아티스트</S.Label>
        <S.ChipsWrapper>
          <S.Chip selected clickable>
            아이브
          </S.Chip>
          <S.Chip selected clickable>
            장원영
          </S.Chip>
        </S.ChipsWrapper>
      </S.OptionRow>

      <S.OptionRow>
        <S.Label>앨범</S.Label>
        <S.ChipsWrapper>
          <S.Chip clickable>선택</S.Chip>
        </S.ChipsWrapper>
      </S.OptionRow>

      <S.OptionRow>
        <S.Label>버전</S.Label>
        <S.ChipsWrapper>
          <S.Chip clickable>선택</S.Chip>
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
    </S.Container>
  );
};

export default OptionSection;
