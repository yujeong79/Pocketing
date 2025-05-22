import styled from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

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
