import { StyledMemberChipList, StyledMemberChipWrapper } from './MemberChipStyle';
import MemberChip from './MemberChip';

interface MemberChipListProps {
  members: string[];
  selectedMember: string | null;
  onSelectMember: (member: string | null) => void;
}

const MemberChipList = ({ members, selectedMember, onSelectMember }: MemberChipListProps) => {
  return (
    <StyledMemberChipWrapper>
      <StyledMemberChipList>
        <MemberChip
          name="전체"
          isSelected={selectedMember === null}
          onClick={() => onSelectMember(null)}
        />
        {members.map((member) => (
          <MemberChip
            key={member}
            name={member}
            isSelected={selectedMember === member}
            onClick={() => onSelectMember(member)}
          />
        ))}
      </StyledMemberChipList>
    </StyledMemberChipWrapper>
  );
};

export default MemberChipList;
