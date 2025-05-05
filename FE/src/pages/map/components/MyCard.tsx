import * as S from './MyCardStyle';

const MyCard = () => {
  return (
    <S.MyCardContainer>
      <S.TextContainer>
        <S.Title>나의 포카</S.Title>
        <S.Content>아직 포카가{`\n`}등록되지 않았어요!</S.Content>
      </S.TextContainer>
    </S.MyCardContainer>
  );
};

export default MyCard;
