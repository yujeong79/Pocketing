import scale from '@/utils/scale';
import styled from 'styled-components';

export const Button = styled.button`
  position: absolute;
  top: ${scale(24)}px;
  left: ${scale(16)}px;
  background: none;
  border: none;
  padding: ${scale(8)}px;
  cursor: pointer;

  img {
    width: ${scale(6)}px;
    height: ${scale(12)}px;
  }

  &:hover {
    opacity: 0.8;
  }
`;
