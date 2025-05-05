import * as S from './OthersCardStyle';

const OthersCard = () => {
  return (
    <S.OthersCardContainer>
      <S.TextContainer>
        <S.Title>원하는 포카</S.Title>
        <S.Content>아직 포카가{`\n`}등록되지 않았어요!</S.Content>
      </S.TextContainer>
    </S.OthersCardContainer>
  );
};

export default OthersCard;
