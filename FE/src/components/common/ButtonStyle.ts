import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts'; // FontStyles import
import scale from '@/utils/scale';

interface ButtonContainerProps {
  height?: number;
  fontStyle?: keyof typeof FontStyles; // FontStyles에서 타입을 가져옵니다.
  disabled?: boolean;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: ${scale(266)}px;
  height: ${(props) =>
    props.height
      ? `${scale(props.height)}px`
      : `${scale(48)}px`}; /* height prop에 따라 동적으로 설정 */
  background-color: ${(props) => (props.disabled ? theme.colors.primary100 : theme.colors.primary)};
  border-radius: ${scale(10)}px;
  border: none;

  /* FontStyles 동적으로 변경 */
  ${(props) => (props.fontStyle ? FontStyles[props.fontStyle] : FontStyles.headingMedium)};
  color: ${theme.colors.white};
  text-align: center;
`;
