import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const ChipContainer = styled.div`
  font-family: 'Pretendard-SemiBold';
  font-size: ${scale(12)}px;
  line-height: ${scale(15)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${scale(26)}px;
  padding: ${scale(2)}px ${scale(12)}px;
  background-color: ${colors.primary50};
  border-radius: ${scale(12)}px;
  gap: ${scale(8)}px;
  margin-top: ${scale(16)}px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;
