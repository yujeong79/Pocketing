import styled from 'styled-components';

import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';

// step.1
export const MyCardModalText = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.black};
`;

export const MyCardImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${scale(24)}px;
  padding-bottom: ${scale(45)}px;
`;

export const MyCardImageLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${scale(125)}px;
  height: ${scale(193)}px;
`;

export const MyCardImageInput = styled.input`
  display: none;
`;

export const MyCardImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-color: ${colors.primary};
  border-style: dashed;
  border-width: ${scale(2)}px;
`;

export const MyCardImageIcon = styled.img`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
`;

export const UploadedImage = styled.img`
  width: ${scale(125)}px;
  height: ${scale(193)}px;
  border-radius: ${scale(10)}px;
  box-shadow: 0px ${scale(3)}px ${scale(6)}px 0px rgba(0, 0, 0, 0.25);
`;

// step.2
export const MyCardInfoContainer = styled.div`
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

// step.3
export const MyCardResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${scale(28)}px;
  padding-bottom: ${scale(76)}px;
  gap: ${scale(24)}px;
`;

export const MyCardResultImage = styled.img`
  width: ${scale(102)}px;
  height: ${scale(158)}px;
  border-radius: ${scale(10)}px;
  box-shadow: 0px ${scale(3)}px ${scale(6)}px 0px rgba(0, 0, 0, 0.25);
`;

export const MyCardResultTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(12)}px;
`;

export const MyCardResultText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
`;

export const MyCardResultHeader = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.primary};
`;

export const MyCardResultContent = styled.div`
  ${FontStyles.captionMedium}
  color: ${colors.black};
`;
