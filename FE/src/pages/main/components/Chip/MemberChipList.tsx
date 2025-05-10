import {
  StyledMemberChipList,
  StyledMemberChipWrapper,
} from '@/pages/main/components/Chip/MemberChipStyle';
import MemberChip from '@/pages/main/components/Chip/MemberChip';
import { useMembers } from '@/hooks/artist/query/useMembers';

interface MemberChipListProps {
  groupId: number;
  selectedMember: number | null;
  onSelectMember: (memberId: number | null) => void;
}

const MemberChipList = ({ groupId, selectedMember, onSelectMember }: MemberChipListProps) => {
  const { data: membersData } = useMembers(groupId);

  if (!groupId) return null;

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
            memberId={member.memberId}
            isSelected={selectedMember === member.memberId}
            onClick={() => onSelectMember(member.memberId)}
          />
        ))}
      </StyledMemberChipList>
    </StyledMemberChipWrapper>
  );
};

export default MemberChipList;
