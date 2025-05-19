import styled from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const NonAlarmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const NonAlarmText = styled.div`
  ${FontStyles.bodySmall};
  color: ${colors.gray500};
  padding-top: ${scale(32)}px;
`;

export const AlarmPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${scale(16)}px;
  gap: ${scale(32)}px;
`;

export const AlarmItemContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const RejectedCover = styled.div`
  position: absolute;
  z-index: 100;
  width: ${scale(266)}px;
  height: ${scale(52)}px;
  background-color: ${colors.white};
  opacity: 0.5;
`;

export const AlarmProfileImage = styled.img`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: 50%;
  border: ${scale(1)}px solid ${colors.primary};
`;

export const AlarmRightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
`;

export const AlarmHeader = styled.div`
  display: flex;
`;

export const AlarmName = styled.div`
  ${FontStyles.bodySmall};
  font-weight: bold;
  color: ${colors.primary};
`;

export const AlarmTitle = styled.div`
  ${FontStyles.bodySmall};
  color: ${colors.black};
`;

export const AlarmButtonContainer = styled.div`
  display: flex;
  width: ${scale(204)}px;
  gap: ${scale(12)}px;
`;
