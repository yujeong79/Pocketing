// ChatbotButtonStyle.ts
import scale from '@/utils/scale';
import styled from 'styled-components';

export const Button = styled.button`
  position: fixed;
  bottom: ${scale(90)}px;
  right: ${scale(10)}px;
  width: ${scale(45)}px;
  height: ${scale(45)}px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
