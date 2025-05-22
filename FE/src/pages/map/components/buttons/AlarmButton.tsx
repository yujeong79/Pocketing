import * as S from '@/pages/map/components/buttons/AlarmButtonStyle';
import { AlarmTrueIcon, AlarmFalseIcon } from '@/assets/assets';

interface AlarmButtonProps {
  onClick?: () => void;
  hasUnread?: boolean;
}
const AlarmButton = ({ onClick, hasUnread = false }: AlarmButtonProps) => {
  return (
    <S.AlarmButtonContainer onClick={onClick} $hasUnread={hasUnread}>
      <S.AlarmImage src={hasUnread ? AlarmTrueIcon : AlarmFalseIcon} />
    </S.AlarmButtonContainer>
  );
};

export default AlarmButton;
