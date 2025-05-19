import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import * as S from './MyMemberEditStyle';
import Button from '@/components/common/Button';
import Toast from '@/components/common/Toast';
import BackButton from '@/components/common/BackButton';
import { useMembers } from '@/hooks/artist/query/useMembers';
import { useGroups } from '@/hooks/artist/query/useGroups';
import { Member, MemberResponse } from '@/types/member';
import { GroupResponse } from '@/types/group';
import { Logo2d, CloseIcon } from '@/assets/assets';
import { useDeleteLikedMembers, useUpdateLikedMembers } from '@/hooks/user/mutation/useLike';
import { QUERY_KEYS } from '@/constants/queryKeys';

// TODO:렌더링이 느린 감이 있음. 최적화 필요
// 멤버를 선택했을 시 그룹에 효과를 넣어야함

const MyMemberEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from || '/profile';
  const { groupId } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warning'>('success');

  const { data: membersData } = useMembers(Number(groupId)) as {
    data: MemberResponse | undefined;
  };
  const { data: groupsData } = useGroups() as { data: GroupResponse | undefined };
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
    console.log('멤버 데이터:', groupMembers);

    // 관심 멤버가 앞으로 오도록 정렬
    const sortedMembers = [...groupMembers].sort((a, b) => {
      if (a.interest && !b.interest) return -1;
      if (!a.interest && b.interest) return 1;
      return 0;
    });

    setMembers(sortedMembers);

    // interest가 true인 멤버들의 ID를 selectedMemberIds에 설정
    const likedMemberIds = groupMembers
      .filter((member) => member.interest)
      .map((member) => member.memberId);
    setSelectedMemberIds(likedMemberIds);
  }, [groupId, membersData, groupsData]);

  // 관심 멤버 삭제
  const handleDeleteLikedMember = useCallback(
    async (memberId: number, e: React.MouseEvent) => {
      e.stopPropagation(); // 이벤트 버블링 방지
      const member = members.find((m) => m.memberId === memberId);
      if (!member?.interest) return; // 관심 멤버가 아니면 삭제 불가

      try {
        await deleteLikedMembersMutation.mutateAsync(memberId);

        // 토스트 메시지 표시
        setToastMessage('관심 멤버가 삭제되었습니다.');
        setToastType('success');
        setShowToast(true);

        // 캐시 무효화 - useMembers 쿼리가 자동으로 다시 실행됨
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEMBERS, Number(groupId)] });
      } catch (error) {
        console.error('관심 멤버 삭제 실패:', error);
        setToastMessage('관심 멤버 삭제에 실패했습니다.');
        setToastType('warning');
        setShowToast(true);
      }
    },
    [deleteLikedMembersMutation, groupId, queryClient, members]
  );

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

      // 토스트 메시지 띄우기
      setToastMessage('관심 멤버 선택이 완료되었습니다.');
      setToastType('success');
      setShowToast(true);

      // 1초 후 페이지 이동 (원하는 시간으로 조정 가능)
      setTimeout(() => {
        navigate('/myGroupEdit', { state: { from: fromPath } });
      }, 1000);
    } catch (error) {
      console.error('관심 멤버 업데이트 실패:', error);
    }
  }, [groupId, selectedMemberIds, navigate, fromPath, updateLikedMembersMutation]);

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton
          fallbackPath="/myGroupEdit"
          onClick={() => navigate('/myGroupEdit', { state: { from: fromPath } })}
        />
        <S.Title>관심 멤버를 선택해주세요</S.Title>
        <S.MemberListContainer>
          {members.map((member) => {
            console.log(`멤버 ${member.name}의 interest 상태:`, member.interest);
            return (
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
            );
          })}
        </S.MemberListContainer>
      </S.ItemContainer>
      <Button text="완료" onClick={handleComplete} />
      {showToast && (
        <Toast type={toastType} message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </S.PageContainer>
  );
};

export default MyMemberEditPage;
