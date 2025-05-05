import { useState } from 'react';

import * as S from './AlarmButtonStyle';
import { AlarmFalseIcon, AlarmTrueIcon } from '@/assets/assets';

const AlarmButton = () => {
  const [isAlarm, setIsAlarm] = useState(true);

  return (
    <S.AlarmButtonContainer $isAlarm={isAlarm}>
      <S.AlarmImage src={isAlarm ? AlarmTrueIcon : AlarmFalseIcon} />
    </S.AlarmButtonContainer>
  );
};

export default AlarmButton;
