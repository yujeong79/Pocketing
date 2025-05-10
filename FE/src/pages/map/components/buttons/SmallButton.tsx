import * as S from './SmallButtonStyle';

interface SmallButtonProps {
  type: 'accept' | 'reject';
  text: string;
  onClick: () => void;
}

const SmallButton = ({ type, text, onClick }: SmallButtonProps) => {
  return (
    <S.SmallButtonContainer type={type} onClick={onClick}>
      <S.SmallButtonText type={type}>{text}</S.SmallButtonText>
    </S.SmallButtonContainer>
  );
};

export default SmallButton;
