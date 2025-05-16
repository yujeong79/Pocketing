import styled from 'styled-components';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';
import scale from '@/utils/scale';

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(223, 223, 223, 0.47);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: ${scale(230)}px;
  z-index: 1000;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition:
    visibility 0.3s,
    opacity 0.3s;
`;

export const ModalContainer = styled.div<{ $isOpen: boolean }>`
  background: white;
  width: ${scale(224)}px;
  border-radius: ${scale(16)}px;
  padding: ${scale(16)}px ${scale(20)}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '20px')});
  transition: transform 0.3s ease;
`;

export const CautionIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${scale(2)}px;

  img {
    width: ${scale(45)}px;
    height: ${scale(39)}px;
  }
`;

export const Title = styled.div`
  font-family: Pretendard-semibold;
  font-size: ${scale(14)}px;
  font-height: ${scale(12)}px;
  color: ${colors.primary};
  margin-bottom: ${scale(4)}px;
`;

export const Message = styled.p`
  ${FontStyles.captionMedium};
  color: ${colors.gray600};
  margin-bottom: ${scale(8)}px;
  line-height: 1.4;
  text-align: center;
  white-space: pre-line;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: ${scale(32)}px;
  background-color: ${colors.primary};
  border: none;
  border-radius: ${scale(8)}px;
  ${FontStyles.headingSmall};
  color: ${colors.white};
  cursor: pointer;
`;
