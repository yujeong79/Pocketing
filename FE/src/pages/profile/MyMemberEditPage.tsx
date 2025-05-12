import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import * as S from './MyMemberEditStyle';
import Button from '@/components/common/Button';
import { useMembersAll } from '@/hooks/artist/query/useMembers';
import { useGroupsAll } from '@/hooks/artist/query/useGroups';
import { Member, MemberResponse } from '@/types/member';
import { GroupResponse } from '@/types/group';
import { useLikedMembers } from '@/hooks/user/query/useLike';
import { UserResponse } from '@/types/user';
import { Logo2d, CloseIcon } from '@/assets/assets';
import { useDeleteLikedMembers, useUpdateLikedMembers } from '@/hooks/user/mutation/useLike';
import { QUERY_KEYS } from '@/constants/queryKeys';

// TODO:렌더링이 느린 감이 있음. 최적화 필요
// 아이콘이 커서 클릭시 늘어나는 느낌이 있음. 조정 필요
// 멤버를 선택했을 시 그룹에 효과를 넣어야함

const MyMemberEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from || '/profile';
  const { groupId } = useParams();

  const { data: membersData } = useMembersAll(Number(groupId)) as {
    data: MemberResponse | undefined;
  };
  const { data: groupsData } = useGroupsAll() as { data: GroupResponse | undefined };
  const { data: likedMembersData } = useLikedMembers(Number(groupId)) as {
    data: UserResponse | undefined;
  };
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const queryClient = useQueryClient();

  // 관심 멤버 삭제
  const deleteLikedMembersMutation = useDeleteLikedMembers();
  // 관심 멤버 추가
  const updateLikedMembersMutation = useUpdateLikedMembers();

  useEffect(() => {
    if (!groupId || !membersData?.result || !groupsData?.result) return;

    const group = groupsData.result.find((g) => g.groupId === Number(groupId));
    if (!group) return;

    const groupMembers = membersData.result;
    setMembers(groupMembers);

    // 서버에서 관심 멤버 목록 가져와서 설정
    if (likedMembersData?.result && Array.isArray(likedMembersData.result)) {
      const likedMembers = likedMembersData.result;
      const likedMemberIds = likedMembers.map((member) => member.memberId);
      setSelectedMemberIds(likedMemberIds);
    }
  }, [groupId, membersData, groupsData, likedMembersData]);

  // 멤버 클릭 처리 - 관심 멤버가 아닌 경우에만 선택 가능
  const handleMemberClick = useCallback(
    (memberId: number) => {
      const member = members.find((m) => m.memberId === memberId);
      if (!member || member.interest) return; // 이미 관심 멤버면 클릭 무시

      setSelectedMemberIds((prev) =>
        prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
      );
    },
    [members]
  );

  // 관심 멤버 삭제
  const handleDeleteLikedMember = useCallback(
    async (memberId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        await deleteLikedMembersMutation.mutateAsync(memberId);
        setSelectedMemberIds((prev) => prev.filter((id) => id !== memberId));
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKED_MEMBERS, Number(groupId)] });
      } catch (error) {
        console.error('관심 멤버 삭제 실패:', error);
      }
    },
    [deleteLikedMembersMutation, groupId, queryClient]
  );

  // 완료 버튼 처리
  const handleComplete = useCallback(async () => {
    if (!groupId || selectedMemberIds.length === 0) {
      navigate('/myGroupEdit', { state: { from: fromPath } });
      return;
    }

    try {
      await updateLikedMembersMutation.mutateAsync({
        likedGroupList: [
          {
            groupId: Number(groupId),
            likedMemberList: selectedMemberIds,
          },
        ],
      });

      navigate('/myGroupEdit', { state: { from: fromPath } });
    } catch (error) {
      console.error('관심 멤버 업데이트 실패:', error);
    }
  }, [groupId, selectedMemberIds, navigate, fromPath, updateLikedMembersMutation]);

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <S.Title>관심 멤버를 선택해주세요</S.Title>
        <S.MemberListContainer>
          {members.map((member) => (
            <S.MemberItem
              key={member.memberId}
              onClick={() => handleMemberClick(member.memberId)}
              data-selected={selectedMemberIds.includes(member.memberId)}
            >
              <S.MemberContentWrapper>
                <S.MemberItemText $isSelected={selectedMemberIds.includes(member.memberId)}>
                  {member.name}
                </S.MemberItemText>
                {selectedMemberIds.includes(member.memberId) && (
                  <S.MemberItemIcon src={Logo2d} alt={`${member.name} 아이콘`} />
                )}
              </S.MemberContentWrapper>
              {member.interest && (
                <S.DeleteButton
                  onClick={(e) => handleDeleteLikedMember(member.memberId, e)}
                  type="button"
                  aria-label="멤버 삭제"
                >
                  <img src={CloseIcon} alt="삭제" />
                </S.DeleteButton>
              )}
            </S.MemberItem>
          ))}
        </S.MemberListContainer>
      </S.ItemContainer>
      <Button text="완료" onClick={handleComplete} />
    </S.PageContainer>
  );
};

export default MyMemberEditPage;
