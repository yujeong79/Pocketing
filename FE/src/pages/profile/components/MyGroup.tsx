import * as S from './MyGroupStyle';
import { PhotocardIcon } from '@/assets/assets';
import { useLikedGroups } from '@/hooks/user/query/useLike';
import { UserLikedGroup } from '@/types/user';

interface MyGroupProps {
  onEditGroup: () => void;
}

const MyGroup = ({ onEditGroup }: MyGroupProps) => {
  const { data: likedGroups } = useLikedGroups();

  return (
    <S.GroupContainer>
      <S.GroupTitleContainer>
        <S.GroupTitleIcon src={PhotocardIcon} alt="그룹 아이콘" />
        <S.GroupTitle>관심 그룹</S.GroupTitle>
      </S.GroupTitleContainer>
      <S.GroupLogoContainer>
        {(likedGroups?.result as UserLikedGroup[]).map((group, index) => (
          <S.GroupLogo
            key={group.groupId ?? index}
            src={group.groupImageUrl ?? ''}
            alt={group.groupNameKo ?? ''}
          />
        ))}
        <S.MoreGroupButton onClick={onEditGroup}>+</S.MoreGroupButton>
      </S.GroupLogoContainer>
    </S.GroupContainer>
  );
};

export default MyGroup;
