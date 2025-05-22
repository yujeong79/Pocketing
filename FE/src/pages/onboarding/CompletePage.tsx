import { useNavigate } from 'react-router-dom';

import * as S from './CompleteStyle';
import { CompleteIcon } from '@/assets/assets';
import Button from '@/components/common/Button';

const CompletePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/main');
  };

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <S.CompleteIcon src={CompleteIcon} alt="완료 아이콘" />
        <S.Title>가입이 완료되었습니다!</S.Title>
        <S.Description>
          이제 좋아하는 아이돌의
          <br />
          포토카드를 찾아보세요
        </S.Description>
      </S.ItemContainer>
      <S.ButtonContainer>

      <Button text="시작하기" onClick={handleStart} />
      </S.ButtonContainer>
    </S.PageContainer>
  );
};

export default CompletePage;
