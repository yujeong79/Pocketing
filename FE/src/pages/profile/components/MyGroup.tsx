import * as S from './MyGroupStyle';
import { PhotocardIcon } from '@/assets/assets';
import { useLikedGroups } from '@/hooks/user/query/useLike';
import { UserLikedGroup } from '@/types/user';
import { useNavigate } from 'react-router-dom';

interface MyGroupProps {
  onEditGroup: () => void;
}

const MyGroup = ({ onEditGroup }: MyGroupProps) => {
  const navigate = useNavigate();
  const { data: likedGroups } = useLikedGroups();

  const handleClickGroup = (groupId: number) => {
    navigate(`/myMemberEdit/${groupId}`, { state: { from: '/profile' } });
  };

  return (
    <S.GroupContainer>
      <S.GroupTitleContainer>
        <S.GroupTitleIcon src={PhotocardIcon} alt="그룹 아이콘" />
        <S.GroupTitle>관심 그룹</S.GroupTitle>
      </S.GroupTitleContainer>
      <S.GroupLogoContainer>
        {((likedGroups?.result as UserLikedGroup[]) || []).map((group, index) => (
          <S.GroupLogo
            key={group.groupId ?? index}
            src={group.groupImageUrl ?? ''}
            alt={group.groupNameKo ?? ''}
            onClick={() => handleClickGroup(group.groupId)}
          />
        ))}
        <S.MoreGroupButton onClick={onEditGroup}>+</S.MoreGroupButton>
      </S.GroupLogoContainer>
    </S.GroupContainer>
  );
};

export default MyGroup;
