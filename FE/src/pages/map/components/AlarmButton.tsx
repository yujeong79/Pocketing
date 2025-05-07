import { useState } from 'react';

import * as S from './AlarmButtonStyle';
import { AlarmFalseIcon, AlarmTrueIcon } from '@/assets/assets';

interface AlarmButtonProps {
  onClick?: () => void;
}

const AlarmButton = ({ onClick }: AlarmButtonProps) => {
  const [isAlarm, setIsAlarm] = useState(true);

  return (
    <S.AlarmButtonContainer $isAlarm={isAlarm} onClick={onClick}>
      <S.AlarmImage src={isAlarm ? AlarmTrueIcon : AlarmFalseIcon} />
    </S.AlarmButtonContainer>
  );
};

export default AlarmButton;
