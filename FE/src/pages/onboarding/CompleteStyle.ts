import styled from 'styled-components';

import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: ${scale(24)}px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: ${scale(24)}px;
`;

export const CompleteIcon = styled.img`
  width: ${scale(80)}px;
  height: ${scale(80)}px;
`;

export const Title = styled.div`
  ${FontStyles.headingLarge};
  color: ${colors.gray800};
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${scale(36)}px;
`;

export const Description = styled.div`
  ${FontStyles.bodyMedium};
  color: ${colors.gray600};
  text-align: center;
  line-height: 1.5;
`;
