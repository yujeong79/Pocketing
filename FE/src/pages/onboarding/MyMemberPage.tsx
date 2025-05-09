import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import * as S from './MyMemberStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import MemberItem from './components/MemberItem';
import { useMembersAll } from '@/hooks/artist/query/useMembers';
import { useGroupsAll } from '@/hooks/artist/query/useGroups';
import { Member, MemberResponse } from '@/types/member';
import { GroupResponse } from '@/types/group';
import { useLikedMembersStore } from '@/store/likedMembers';
// TODO:렌더링이 느린 감이 있음. 최적화 필요
// 아이콘이 커서 클릭시 늘어나는 느낌이 있음. 조정 필요
// 멤버를 선택했을 시 그룹에 효과를 넣어야함

const MyMemberPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { data: membersData } = useMembersAll(Number(groupId)) as {
    data: MemberResponse | undefined;
  };
  const { data: groupsData } = useGroupsAll() as { data: GroupResponse | undefined };
  const [members, setMembers] = useState<Member[]>([]);
  const [updateKey, setUpdateKey] = useState(0);

  const { getSelectedMembers, updateGroupMembers } = useLikedMembersStore();
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);

  useEffect(() => {
    if (!groupId || !membersData?.result || !groupsData?.result) return;

    const group = groupsData.result.find((g) => g.groupId === Number(groupId));
    if (!group) return;

    const groupMembers = membersData.result.filter(
      (member) => member.groupNameEn === group.groupNameEn
    );
    setMembers(groupMembers);

    // Zustand store에서 선택된 멤버 정보 불러오기
    const savedMembers = getSelectedMembers(Number(groupId));
    setSelectedMemberIds(savedMembers);
  }, [groupId, membersData, groupsData, getSelectedMembers]);

  const handleMemberClick = useCallback((memberId: number) => {
    setSelectedMemberIds((prev) => {
      const newIds = prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId];
      setUpdateKey((key) => key + 1);
      return newIds;
    });
  }, []);

  const handleComplete = useCallback(() => {
    if (!groupId) return;
    updateGroupMembers(Number(groupId), selectedMemberIds);
    navigate('/group');
  }, [groupId, selectedMemberIds, navigate, updateGroupMembers]);

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton />
        <S.Title>관심 멤버를 선택해주세요</S.Title>
        <S.MemberListContainer key={updateKey}>
          {members.map((member) => (
            <MemberItem
              key={`${member.memberId}-${selectedMemberIds.includes(member.memberId)}`}
              member={member.name}
              isSelected={selectedMemberIds.includes(member.memberId)}
              onPressed={() => handleMemberClick(member.memberId)}
            />
          ))}
        </S.MemberListContainer>
      </S.ItemContainer>
      <Button text="완료" onClick={handleComplete} />
    </S.PageContainer>
  );
};

export default MyMemberPage;
