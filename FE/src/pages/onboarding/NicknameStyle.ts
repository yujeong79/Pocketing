import styled from 'styled-components';

import { FontStyles } from '@/constants/fonts';
import scale from '@/utils/scale';
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
`;

export const TitleContainer = styled.div`
  padding-top: ${scale(72)}px;
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
`;

export const FirstTitle = styled.div`
  ${FontStyles.headingXlarge};
  color: ${colors.primary};
  text-align: left;
`;

export const SecondTitle = styled.div`
  ${FontStyles.headingMedium};
  color: ${colors.gray800};
  text-align: left;
`;

export const InputContainer = styled.div`
  padding-top: ${scale(64)}px;
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
`;

export const InputBox = styled.div`
  width: 100%;
  height: ${scale(28)}px;
  padding: ${scale(4)}px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${scale(1)}px solid ${colors.primary};
`;

export const Input = styled.input`
  width: 100%;
  height: ${scale(28)}px;
  border: none;
  outline: none;

  ${FontStyles.bodyMedium};
  color: ${colors.gray800};
`;

export const CheckIcon = styled.img`
  width: ${scale(16)}px;
  height: ${scale(16)}px;
`;

export const Phrase = styled.div<{ type: 'error' | 'success' }>`
  ${FontStyles.captionSmall};
  color: ${({ type }) => (type === 'error' ? colors.danger : colors.success)};
  text-align: left;
  height: ${scale(12)}px;
`;
export const DuplicateCheckButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const DuplicateCheckButton = styled.button`
  width: ${scale(70)}px;
  height: ${scale(28)}px;
  border-radius: ${scale(5)}px;
  background-color: ${colors.white};
  border: ${scale(1)}px solid ${colors.primary};

  ${FontStyles.bodySmall};
  color: ${colors.primary};
`;
