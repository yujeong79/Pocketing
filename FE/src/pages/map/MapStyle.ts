import styled, { keyframes } from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

const rotate = keyframes`
  100% {
    transform: rotate(-360deg);
  }
`;

export const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
`;

export const PageItemContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  padding: ${scale(28)}px ${scale(16)}px 0px;
`;

export const MapHeaderContainer = styled.div`
  display: flex;
  gap: ${scale(8)}px;
`;

export const ExchangeCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: ${scale(20)}px;
  gap: ${scale(16)}px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
  position: absolute;
  bottom: ${scale(100)}px;
  right: ${scale(16)}px;
  z-index: 1;
`;

export const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: 50%;
  background-color: ${colors.white};
  box-shadow: 0px ${scale(4)}px ${scale(4)}px 0px rgba(0, 0, 0, 0.1);
`;

export const ReturnButton = styled.img`
  width: ${scale(22)}px;
  height: ${scale(22)}px;
`;

export const RefreshButton = styled.img<{ $spinning?: boolean }>`
  width: ${scale(22)}px;
  height: ${scale(22)}px;
  animation: ${({ $spinning }) => ($spinning ? rotate : 'none')} 0.3s linear;
`;

export const RangeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${scale(54)}px;
  height: ${scale(20)}px;
  background-color: ${colors.primary};
  border-radius: ${scale(10)}px;
  box-shadow: 0px ${scale(4)}px ${scale(4)}px 0px rgba(0, 0, 0, 0.1);

  position: absolute;
  left: 50%;
  bottom: ${scale(80)}px;
  z-index: 1;
  transform: translateX(-50%);
`;

export const RangeButton = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.white};
`;

export const RangeModalText = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.black};
  padding-top: ${scale(4)}px;
`;

export const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${scale(24)}px;
  padding-top: ${scale(36)}px;
  padding-bottom: ${scale(24)}px;
`;

export const Range100 = styled.div<{ $selected?: boolean }>`
  ${FontStyles.headingMedium}
  color: ${colors.black};
  ${({ $selected }) => $selected && `color: ${colors.primary};`}
`;

export const Range300 = styled.div<{ $selected?: boolean }>`
  ${FontStyles.headingMedium}
  color: ${colors.black};
  ${({ $selected }) => $selected && `color: ${colors.primary};`}
`;

export const Range500 = styled.div<{ $selected?: boolean }>`
  ${FontStyles.headingMedium}
  color: ${colors.black};
  ${({ $selected }) => $selected && `color: ${colors.primary};`}
`;

export const MyCardModalText = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.black};
`;
