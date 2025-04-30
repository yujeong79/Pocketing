import { useNavigate } from 'react-router-dom';

import * as S from './CompleteStyle';

import { CompleteIcon } from '@/assets/assets';
import Button from '@/components/common/Button';

const CompletePage = () => {
  const navigate = useNavigate();

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <S.CompleteIcon src={CompleteIcon} alt="완료 아이콘" />
        <S.CompleteText>가입이 완료되었습니다</S.CompleteText>
      </S.ItemContainer>
      <Button text="시작하기" onClick={() => navigate('/main')} />
    </S.PageContainer>
  );
};

export default CompletePage;
