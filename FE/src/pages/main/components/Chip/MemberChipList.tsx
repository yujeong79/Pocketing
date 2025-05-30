import {
  StyledMemberChipList,
  StyledMemberChipWrapper,
} from '@/pages/main/components/Chip/MemberChipStyle';
import MemberChip from '@/pages/main/components/Chip/MemberChip';
import { useMembers } from '@/hooks/artist/query/useMembers';
import { HeartWhiteIcon, HeartGrayIcon } from '@/assets/assets';
import { LoadingChip } from '../../../../components/common/LoadingChip';

interface MemberChipListProps {
  groupId: number;
  selectedMember: number | null;
  onSelectMember: (memberId: number | null) => void;
}

const MemberChipList = ({ groupId, selectedMember, onSelectMember }: MemberChipListProps) => {
  const { data: membersResponse, isLoading } = useMembers(groupId);

  if (!groupId) return null;
  if (isLoading) return <LoadingChip />;
  if (!membersResponse?.result) return null;

  const members = membersResponse.result;
  const sortedMembers = [...members].sort((a, b) => {
    // interest가 true인 멤버를 앞으로 정렬
    if (a.interest && !b.interest) return -1;
    if (!a.interest && b.interest) return 1;
    return 0;
  });

  // 멤버가 1명일 때는 "전체" 칩 삭제, 항상 그 멤버 칩 레더링
  if (sortedMembers.length === 1) {
    const soloMember = sortedMembers[0];
    // 선택된 멤버가 아니면 자동으로 선택
    if (selectedMember !== soloMember.memberId) {
      onSelectMember(soloMember.memberId);
    }
    return (
      <StyledMemberChipWrapper>
        <StyledMemberChipList>
          <MemberChip
            name={soloMember.name}
            memberId={soloMember.memberId}
            isSelected={selectedMember === soloMember.memberId}
            onClick={() => onSelectMember(soloMember.memberId)}
            heartIcon={soloMember.interest ? HeartWhiteIcon : HeartGrayIcon}
          />
        </StyledMemberChipList>
      </StyledMemberChipWrapper>
    );
  }

  return (
    <StyledMemberChipWrapper>
      <StyledMemberChipList>
        <MemberChip
          name="전체"
          isSelected={selectedMember === null}
          onClick={() => onSelectMember(null)}
        />
        {sortedMembers.map((member) => {
          const isSelected = selectedMember === member.memberId;
          const isInterest = member.interest;

          return (
            <MemberChip
              key={member.memberId}
              name={member.name}
              memberId={member.memberId}
              isSelected={isSelected}
              onClick={() => onSelectMember(member.memberId)}
              heartIcon={isInterest ? (isSelected ? HeartWhiteIcon : HeartGrayIcon) : undefined}
            />
          );
        })}
      </StyledMemberChipList>
    </StyledMemberChipWrapper>
  );
};

export default MemberChipList;
