import * as S from './PocketCallButtonStyle';
import { PocketCallIcon } from '@/assets/assets';

interface PocketCallButtonProps {
  onClick: () => void;
  disabled?: boolean;
  $isRequested: 'PENDING' | 'ACCEPTED' | 'REJECTED' | null;
}

const PocketCallButton = ({ onClick, disabled = false, $isRequested }: PocketCallButtonProps) => {
  const handleClick = () => {
    if (disabled) {
      return;
    }
    if ($isRequested) {
      return;
    }
    onClick();
  };

  return (
    <S.PocketCallButtonContainer onClick={handleClick}>
      <S.PocketCallContent $isRequested={$isRequested}>
        {!$isRequested ? (
          <>
            <S.PocketCallText>포켓콜</S.PocketCallText>
            <S.PocketCallIcon src={PocketCallIcon} alt="전송" />
          </>
        ) : (
          <S.PocketCallText>요청중</S.PocketCallText>
        )}
      </S.PocketCallContent>
    </S.PocketCallButtonContainer>
  );
};

export default PocketCallButton;
