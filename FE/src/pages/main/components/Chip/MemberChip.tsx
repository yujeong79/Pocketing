import { StyledMemberChip } from './MemberChipStyle';

interface MemberChipProps {
  name: string;
  memberId?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const MemberChip = ({ name, isSelected = false, onClick }: MemberChipProps) => {
  return (
    <StyledMemberChip $isSelected={isSelected} onClick={onClick}>
      {name}
    </StyledMemberChip>
  );
};

export default MemberChip;
