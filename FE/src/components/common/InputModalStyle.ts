import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(223, 223, 223, 0.47);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: ${scale(100)}px;
  z-index: 1000;
  visibility: visible;
  opacity: 1;
`;

export const ModalContainer = styled.div`
  background: white;
  width: ${scale(260)}px;
  border-radius: ${scale(16)}px;
  padding: ${scale(16)}px ${scale(20)}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Title = styled.h2`
  font-family: Pretendard-semibold;
  font-size: ${scale(14)}px;
  color: ${colors.primary};
  margin-bottom: ${scale(8)}px;
  text-align: center;
`;

export const Label = styled.label`
  ${FontStyles.captionMedium};
  color: ${colors.gray600};
  margin-bottom: ${scale(8)}px;
  display: block;
  text-align: left;
`;

export const Input = styled.input`
  font-size: ${scale(16)}px;
  padding: ${scale(8)}px;
  border: 1px solid ${colors.gray200};
  border-radius: ${scale(8)}px;
  margin-bottom: ${scale(20)}px;
  outline: none;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: ${scale(8)}px;
`;

export const ConfirmButton = styled.button`
  flex: 1;
  height: ${scale(32)}px;
  background-color: ${colors.primary};
  border: none;
  border-radius: ${scale(8)}px;
  ${FontStyles.headingSmall};
  color: ${colors.white};
  cursor: pointer;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: ${scale(32)}px;
  background-color: ${colors.gray200};
  border: none;
  border-radius: ${scale(8)}px;
  ${FontStyles.headingSmall};
  color: ${colors.gray600};
  cursor: pointer;
`;
