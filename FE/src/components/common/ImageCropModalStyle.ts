import styled from 'styled-components';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';

export const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(223, 223, 223, 0.47);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background: ${colors.white};
  padding: ${scale(24)}px;
  border-radius: ${scale(12)}px;
  width: ${scale(240)}px;
  height: ${scale(320)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CropArea = styled.div`
  position: relative;
  width: ${scale(240)}px;
  height: ${scale(240)}px;
  margin-bottom: ${scale(8)}px;
  overflow: hidden;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: ${scale(16)}px;
  margin-top: ${scale(12)}px;
`;

export const Button = styled.button`
  padding: ${scale(8)}px ${scale(32)}px;
  border-radius: ${scale(6)}px;
  border: none;
  background: ${colors.gray200};
  color: ${colors.gray600};
  font-weight: bold;
  cursor: pointer;
  &:last-child {
    background: ${colors.primary};
    color: ${colors.white};
  }
`;
