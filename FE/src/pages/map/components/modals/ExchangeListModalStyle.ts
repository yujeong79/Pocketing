import styled, { keyframes } from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

const rotate = keyframes`
  100% {
    transform: rotate(-360deg);
  }
`;

export const ExchangeModalSecondHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: ${scale(4)}px;
`;

export const ExchangeModalSecondHeaderText = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.black};
  white-space: pre-line;
`;

export const ExchangeListRefreshButton = styled.img<{ $spinning?: boolean }>`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
  cursor: pointer;
  animation: ${({ $spinning }) => ($spinning ? rotate : 'none')} 0.3s linear;
`;

export const ExchangeModalThirdHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: ${scale(8)}px;
`;

export const ExchangeModalThirdHeaderLeft = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.gray600};
`;

export const ExchangeModalThirdHeaderRight = styled.div<{ $isMax?: boolean }>`
  ${FontStyles.bodySmall}
  color: ${({ $isMax }) => ($isMax ? colors.primary : colors.black)};
`;

export const ExchangeListEmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${scale(100)}px;

  ${FontStyles.bodyMedium}
  color: ${colors.gray600};
`;

export const ExchangeUserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(12)}px;
  padding: ${scale(16)}px ${scale(4)}px;
`;

export const ExchangeUserList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ExchangeUserLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${scale(24)}px;
`;

export const ExchangeCardImage = styled.img`
  width: ${scale(48)}px;
  height: ${scale(73)}px;
  border-radius: ${scale(4)}px;
  box-shadow: 0px ${scale(3)}px ${scale(6)}px 0px rgba(0, 0, 0, 0.2);
`;

export const ExchangeUserName = styled.div`
  ${FontStyles.bodyMedium}
  color: ${colors.black};
`;

export const Divider = styled.div`
  width: 100%;
  height: ${scale(1)}px;
  background-color: ${colors.gray100};
`;
