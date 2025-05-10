import styled from 'styled-components';

import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';
import scale from '@/utils/scale';

export const OthersCardModalText = styled.div`
  padding-top: ${scale(4)}px;
  ${FontStyles.bodySmall}
  color: ${colors.black};
`;

export const OthersCardInfoContainer = styled.div`
  display: flex;
  gap: ${scale(12)}px;
  padding-top: ${scale(28)}px;
  padding-bottom: ${scale(66)}px;
`;

export const LeftInfoContainer = styled.div`
  display: flex;

  flex-direction: column;
  gap: ${scale(12)}px;
  width: ${scale(124)}px;
  border-right: ${scale(1)}px solid ${colors.primary};
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
`;

export const SelectHeader = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.primary};
`;

export const SelectContent = styled.div`
  ${FontStyles.bodyMedium}
  color: ${colors.gray500};
`;

export const RightInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
  height: ${scale(168)}px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${scale(124)}px;
  height: ${scale(28)}px;
  border-radius: ${scale(10)}px;
  border: ${scale(1)}px solid ${colors.primary};
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  padding: ${scale(4)}px ${scale(8)}px;
  ${FontStyles.captionMedium}
  color: ${colors.black};
  background-color: transparent;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
  overflow-y: auto;
`;

export const ResultItem = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.gray500};
`;
