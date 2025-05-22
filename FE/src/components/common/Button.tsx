import * as S from './ButtonStyle';
import { FontStyles } from '@/constants/fonts'; // FontStyles import

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  height?: number; 
  fontStyle?: keyof typeof FontStyles; // FontStyles에서 정의된 스타일을 받아옵니다.
}

const Button = ({ text, onClick, disabled, height, fontStyle }: ButtonProps) => {
  return (
    <S.ButtonContainer 
      onClick={onClick} 
      disabled={disabled} 
      height={height} 
      fontStyle={fontStyle}
    >
      {text}
    </S.ButtonContainer>
  );
};

export default Button;
