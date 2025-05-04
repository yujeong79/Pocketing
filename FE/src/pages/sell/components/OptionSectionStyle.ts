// OptionSectionStyle.ts
import styled from 'styled-components';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';

interface ChipProps {
  selected?: boolean;
  clickable?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.span`
  font-family: 'Pretendard-Medium';
  font-weight: 500;
  font-size: ${scale(14)}px;
  line-height: ${scale(16)}px;
  letter-spacing: -2%;
  margin-right: ${scale(16)}px;
  min-width: ${scale(60)}px;
  text-align: right;
`;

export const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* 너비가 좁을 때 줄바꿈 */
  gap: ${scale(12)}px;
  overflow-x: auto; /* 가로 스크롤 */
  -webkit-overflow-scrolling: touch;
`;

export const Chip = styled.button<ChipProps>`
  box-sizing: border-box;
  padding: ${scale(12)}px;
  border-radius: ${scale(14)}px;
  height: ${scale(28)}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  background-color: ${(p) => (p.selected ? colors.primary50 : colors.white)};
  color: ${(p) => (p.selected ? colors.gray800 : colors.primary)};
  border: ${(p) => (p.selected ? 'none' : `1px solid ${colors.gray200}`)};

  font-family: 'Pretendard-Medium';
  font-weight: 500;
  font-size: ${scale(14)}px;
  line-height: ${scale(20)}px;
  letter-spacing: -2%;

  &:hover {
    ${(p) => p.clickable && `opacity: 0.8;`}
  }
`;

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PriceInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${scale(4)}px;
`;

export const PriceInput = styled.input`
  width: ${scale(90)}px;
  height: ${scale(32)}px;
  padding: ${scale(12)}px ${scale(16)}px;
  border: 1px solid ${colors.gray200};
  border-radius: ${scale(8)}px;
  font-family: 'Pretendard-Medium';
  font-size: ${scale(14)}px;
  font-weight: 500;
  text-align: right;
  margin-right: ${scale(4)}px;
  &::placeholder {
    color: ${colors.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const PriceUnit = styled.span`
  font-family: 'Pretendard-Medium';
  font-size: ${scale(14)}px;
  font-weight: 500;
`;

export const MarketPriceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${scale(8)}px;
`;

export const MarketPriceButton = styled.div`
  display: flex;
  font-family: 'Pretendard-Medium';
  font-size: ${scale(12)}px;
  font-weight: 500;
  line-height: ${scale(16)}px;
  color: ${colors.primary};
  margin-left: ${scale(16)}px;
  cursor: pointer;
`;

export const PriceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
`;

export const PriceInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${scale(4)}px;
  font-family: 'Pretendard-Medium';
  font-size: ${scale(12)}px;
  color: ${colors.gray600};
  line-height: ${scale(16)}px;
`;

export const PriceValue = styled.span`
  color: ${colors.gray800};
  margin-left: ${scale(2)}px;
  text-align: right;
`;
