import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import * as S from './MyMemberEditStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { useMembersAll } from '@/hooks/artist/query/useMembers';
import { useGroupsAll } from '@/hooks/artist/query/useGroups';
import { Member, MemberResponse } from '@/types/member';
import { GroupResponse } from '@/types/group';
import { useLikedMembersStore } from '@/store/likedMembers';
import { useLikedMembers } from '@/hooks/user/query/useLike';
import { UserLikedMember, UserResponse } from '@/types/user';
import { Logo2d, CloseIcon } from '@/assets/assets';
import { useDeleteLikedMembers, useDeleteLikedGroups } from '@/hooks/user/mutation/useLike';
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

  const { getSelectedMembers, updateGroupMembers } = useLikedMembersStore();
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>(() => {
    // 초기값을 즉시 설정
    return groupId ? getSelectedMembers(Number(groupId)) : [];
  });

  const deleteLikedMembersMutation = useDeleteLikedMembers();
  const deleteLikedGroupsMutation = useDeleteLikedGroups();
  const queryClient = useQueryClient();

  // 현재 관심 멤버인지 확인하는 함수
  const isLikedMember = useCallback(
    (memberId: number) => {
      if (!likedMembersData?.result || !Array.isArray(likedMembersData.result)) return false;
      const likedMembers = likedMembersData.result as UserLikedMember[];
      return likedMembers.some(
        (likedMember) => members.find((m) => m.memberId === memberId)?.name === likedMember.name
      );
    },
    [likedMembersData, members]
  );

  // 관심 멤버 삭제 처리
  const handleDeleteLikedMember = useCallback(
    async (memberId: number, e: React.MouseEvent) => {
      e.stopPropagation(); // 이벤트 버블링 방지
      try {
        await deleteLikedMembersMutation.mutateAsync(memberId);

        // 선택된 멤버 목록에서도 제거
        const newSelectedIds = selectedMemberIds.filter((id) => id !== memberId);
        setSelectedMemberIds(newSelectedIds);
        updateGroupMembers(Number(groupId), newSelectedIds);

        // 캐시 업데이트를 위해 likedMembers 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKED_MEMBERS, Number(groupId)] });
      } catch (error) {
        console.error('관심 멤버 삭제 실패:', error);
      }
    },
    [deleteLikedMembersMutation, groupId, selectedMemberIds, updateGroupMembers, queryClient]
  );

  useEffect(() => {
    if (!groupId || !membersData?.result || !groupsData?.result) return;

    const group = groupsData.result.find((g) => g.groupId === Number(groupId));
    if (!group) return;

    const groupMembers = membersData.result.filter(
      (member) => member.groupNameEn === group.groupNameEn
    );
    setMembers(groupMembers);

    // 서버에서 가져온 관심 멤버 정보와 Zustand store의 정보를 모두 확인
    const savedMembers = getSelectedMembers(Number(groupId));

    if (likedMembersData?.result && Array.isArray(likedMembersData.result)) {
      const likedMembers = likedMembersData.result as UserLikedMember[];

      // 이름으로 매칭하여 현재 그룹의 멤버 ID 찾기
      const matchedMemberIds = groupMembers
        .filter((groupMember) =>
          likedMembers.some((likedMember) => likedMember.name === groupMember.name)
        )
        .map((member) => member.memberId);

      console.log('이름으로 매칭된 멤버 ID:', matchedMemberIds);

      // 서버 데이터와 로컬 데이터 중 하나라도 있으면 표시
      const mergedMemberIds = Array.from(new Set([...matchedMemberIds, ...savedMembers]));
      console.log('최종 선택된 멤버 ID:', mergedMemberIds);

      setSelectedMemberIds(mergedMemberIds);
      updateGroupMembers(Number(groupId), mergedMemberIds);
    }
  }, [groupId, membersData, groupsData, likedMembersData, getSelectedMembers, updateGroupMembers]);

  const handleMemberClick = useCallback(
    (memberId: number) => {
      console.log('멤버 클릭:', memberId);
      setSelectedMemberIds((prev) => {
        const newIds = prev.includes(memberId)
          ? prev.filter((id) => id !== memberId)
          : [...prev, memberId];
        console.log('새로운 선택된 멤버 ID:', newIds);
        // 상태 변경 시 즉시 Zustand store 업데이트
        updateGroupMembers(Number(groupId), newIds);
        return newIds;
      });
    },
    [groupId, updateGroupMembers]
  );

  const handleComplete = useCallback(async () => {
    if (selectedMemberIds.length === 0 && groupId) {
      try {
        // 선택된 멤버가 없으면 그룹도 삭제
        await deleteLikedGroupsMutation.mutateAsync(Number(groupId));
        console.log('관심 그룹 삭제 성공');

        // 캐시 업데이트
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKED_GROUPS] });
      } catch (error) {
        console.error('관심 그룹 삭제 실패:', error);
      }
    }

    navigate('/myGroupEdit', {
      state: { from: fromPath },
    });
  }, [navigate, fromPath, selectedMemberIds, groupId, deleteLikedGroupsMutation, queryClient]);

  // 멤버 아이템 렌더링 최적화
  const renderMemberItem = useCallback(
    (member: Member) => {
      const isSelected = selectedMemberIds.includes(member.memberId);
      const isLiked = isLikedMember(member.memberId);

      return (
        <S.MemberItem
          key={member.memberId}
          onClick={() => handleMemberClick(member.memberId)}
          data-selected={isSelected}
        >
          <S.MemberContentWrapper>
            <S.MemberItemText $isSelected={isSelected}>{member.name}</S.MemberItemText>
            {isSelected && <S.MemberItemIcon src={Logo2d} alt={`${member.name} 아이콘`} />}
          </S.MemberContentWrapper>
          {isLiked && (
            <S.DeleteButton
              onClick={(e) => handleDeleteLikedMember(member.memberId, e)}
              type="button"
              aria-label="멤버 삭제"
            >
              <img src={CloseIcon} alt="삭제" />
            </S.DeleteButton>
          )}
        </S.MemberItem>
      );
    },
    [selectedMemberIds, handleMemberClick, isLikedMember, handleDeleteLikedMember]
  );

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton />
        <S.Title>관심 멤버를 선택해주세요</S.Title>
        <S.MemberListContainer>{members.map(renderMemberItem)}</S.MemberListContainer>
      </S.ItemContainer>
      <Button text="완료" onClick={handleComplete} />
    </S.PageContainer>
  );
};

export default MyMemberEditPage;
