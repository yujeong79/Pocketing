import { useState } from 'react';
import * as S from './PocketCallButtonStyle';
import { PocketCallIcon } from '@/assets/assets';

interface PocketCallButtonProps {
  onClick: () => void;
}

const PocketCallButton = ({ onClick }: PocketCallButtonProps) => {
  const [type, setType] = useState<'basic' | 'send'>('basic');

  const handleClick = () => {
    if (type === 'basic') {
      setType('send');
      onClick();
    }
  };

  return (
    <S.PocketCallButtonContainer onClick={handleClick}>
      <S.PocketCallContent $type={type}>
        {type === 'basic' && (
          <>
            <S.PocketCallText>포켓콜</S.PocketCallText>
            <S.PocketCallIcon src={PocketCallIcon} alt="전송" />
          </>
        )}
        {type === 'send' && <S.PocketCallText>요청중</S.PocketCallText>}
      </S.PocketCallContent>
    </S.PocketCallButtonContainer>
  );
};

export default PocketCallButton;
