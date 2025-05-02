import * as S from './ReportStyle';
import { CallIcon } from '@/assets/assets';

const Report = () => {
  return (
    <S.TitleContainer>
      <S.TitleIcon src={CallIcon} alt="제보하기" />
      <S.Title>제보하기</S.Title>
    </S.TitleContainer>
  );
};

export default Report;
