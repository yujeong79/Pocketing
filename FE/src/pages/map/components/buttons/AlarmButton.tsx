import * as S from './AlarmButtonStyle';
import { AlarmTrueIcon } from '@/assets/assets';

interface AlarmButtonProps {
  onClick?: () => void;
}

const AlarmButton = ({ onClick }: AlarmButtonProps) => {
  return (
    <S.AlarmButtonContainer onClick={onClick}>
      <S.AlarmImage src={AlarmTrueIcon} />
    </S.AlarmButtonContainer>
  );
};

export default AlarmButton;
