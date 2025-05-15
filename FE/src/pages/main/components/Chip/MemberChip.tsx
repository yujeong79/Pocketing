import { StyledHeartIcon, StyledMemberChip } from './MemberChipStyle';

interface MemberChipProps {
  name: string;
  memberId?: number;
  isSelected?: boolean;
  onClick?: () => void;
  heartIcon?: string;
}

const MemberChip = ({ name, isSelected = false, onClick, heartIcon }: MemberChipProps) => {
  return (
    <StyledMemberChip $isSelected={isSelected} onClick={onClick}>
      {heartIcon && <StyledHeartIcon src={heartIcon} alt="하트" />}
      {name}
    </StyledMemberChip>
  );
};

export default MemberChip;
