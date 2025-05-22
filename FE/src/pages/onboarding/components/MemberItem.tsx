import { memo, useCallback } from 'react';

import * as S from './MemberItemStyle';
import { Logo2d } from '@/assets/assets';

interface MemberItemProps {
  member: string;
  isSelected: boolean;
  onPressed: () => void;
}

const MemberItem = memo(
  ({ member, isSelected, onPressed }: MemberItemProps) => {
    const handleClick = useCallback(() => {
      onPressed();
    }, [onPressed]);

    return (
      <S.MemberItem onClick={handleClick}>
        <S.MemberItemText $isSelected={isSelected}>{member}</S.MemberItemText>
        {isSelected && <S.MemberItemIcon src={Logo2d} alt={`${member} 아이콘`} />}
      </S.MemberItem>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isSelected === nextProps.isSelected && prevProps.member === nextProps.member;
  }
);

MemberItem.displayName = 'MemberItem';

export default MemberItem;
