import styled from 'styled-components';

import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding-top: ${scale(24)}px;
  padding-left: ${scale(16)}px;
  padding-right: ${scale(16)}px;
  padding-bottom: ${scale(64)}px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${scale(160)}px;
  gap: ${scale(32)}px;
`;

export const CompleteIcon = styled.img`
  width: ${scale(64)}px;
  height: ${scale(64)}px;
`;

export const CompleteText = styled.div`
  ${FontStyles.headingMedium};
  color: ${colors.gray800};
`;
