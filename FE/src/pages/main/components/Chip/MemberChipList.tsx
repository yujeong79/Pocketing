import { StyledMemberChipList, StyledMemberChipWrapper } from './MemberChipStyle';
import MemberChip from './MemberChip';
import { useMembers } from '@/hooks/artist/query/useMembers';

interface MemberChipListProps {
  groupId: number;
  selectedMember: string | null;
  onSelectMember: (member: string | null) => void;
}

const MemberChipList = ({ groupId, selectedMember, onSelectMember }: MemberChipListProps) => {
  const { data: membersData } = useMembers(groupId);

  const sortedMembers = membersData
    ? [...membersData].sort((a, b) => {
        // interest가 true인 멤버를 앞으로 정렬
        if (a.interest && !b.interest) return -1;
        if (!a.interest && b.interest) return 1;
        return 0;
      })
    : [];

  return (
    <StyledMemberChipWrapper>
      <StyledMemberChipList>
        <MemberChip
          name="전체"
          isSelected={selectedMember === null}
          onClick={() => onSelectMember(null)}
        />
        {sortedMembers.map((member) => (
          <MemberChip
            key={member.memberId}
            name={member.interest ? `♥ ${member.name}` : member.name}
            isSelected={selectedMember === member.name}
            onClick={() => onSelectMember(member.name)}
          />
        ))}
      </StyledMemberChipList>
    </StyledMemberChipWrapper>
  );
};

export default MemberChipList;
