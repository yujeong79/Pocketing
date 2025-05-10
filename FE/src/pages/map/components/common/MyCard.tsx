import * as S from './MyCardStyle';

interface MyCardProps {
  onClick?: () => void;
}

const MyCard = ({ onClick }: MyCardProps) => {
  return (
    <S.MyCardContainer onClick={onClick}>
      <S.TextContainer>
        <S.Title>나의 포카</S.Title>
        <S.Content>아직 포카가{`\n`}등록되지 않았어요!</S.Content>
      </S.TextContainer>
    </S.MyCardContainer>
  );
};

export default MyCard;
