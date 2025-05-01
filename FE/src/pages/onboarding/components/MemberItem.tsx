import { memo } from 'react';

import * as S from './MemberItemStyle';
import { Logo2d } from '@/assets/assets';

interface MemberItemProps {
  member: string;
  isSelected: boolean;
  onPressed: () => void;
}

const MemberItem = memo(({ member, isSelected, onPressed }: MemberItemProps) => {
  return (
    <S.MemberItem onClick={onPressed}>
      <S.MemberItemText $isSelected={isSelected}>{member}</S.MemberItemText>
      {isSelected && <S.MemberItemIcon src={Logo2d} />}
    </S.MemberItem>
  );
});

export default MemberItem;
