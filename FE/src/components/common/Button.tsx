import * as S from './ButtonStyle';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, onClick, disabled }: ButtonProps) => {
  return (
    <S.ButtonContainer onClick={onClick} disabled={disabled}>
      {text}
    </S.ButtonContainer>
  );
};

export default Button;
