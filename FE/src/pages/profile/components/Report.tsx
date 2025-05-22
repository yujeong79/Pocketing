import * as S from './ReportStyle';
import { CallIcon } from '@/assets/assets';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const navigate = useNavigate();

  return (
    <S.TitleContainer onClick={ () => navigate('/report-missing')}>
      <S.TitleIcon src={CallIcon} alt="제보하기" />
      <S.Title>제보하기</S.Title>
    </S.TitleContainer>
  );
};

export default Report;
