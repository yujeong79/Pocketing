import { useNavigate } from 'react-router-dom';
import { StyledGroupImageList, StyledGroupImageWrapper } from './GroupImageStyle';
import GroupImage from './GroupImage';
import { useLikedGroups } from '@/hooks/user/query/useLike';
import { UserLikedGroup } from '@/types/user';

interface GroupImageListProps {
  selectedId: number | null;
  onSelectGroup: (id: number | null) => void;
  selectedAllGroup: number | null;
  onSelectAllGroup: (id: number | null) => void;
  onEditGroup: () => void;
}

const GroupImageList = ({
  selectedId,
  onSelectGroup,
  selectedAllGroup,
  onSelectAllGroup,
  onEditGroup,
}: GroupImageListProps) => {
  const navigate = useNavigate();
  const { data: likedGroups } = useLikedGroups();

  // 어떤 그룹의 이미지 url을 넘겨줄지 찾는 로직
  const selectedGroup =
    selectedAllGroup && likedGroups?.result
      ? (likedGroups.result as UserLikedGroup[]).find((group) => group.groupId === selectedAllGroup)
      : null;

  const handleAllGroupClick = () => {
    if (selectedAllGroup) {
      onSelectAllGroup(null);
    } else {
      navigate('/group/select');
    }
  };

  return (
    <StyledGroupImageWrapper>
      <StyledGroupImageList>
        <GroupImage
          type="all"
          isSelected={selectedId === null}
          onClick={handleAllGroupClick}
          selectedAllGroup={selectedAllGroup}
          groupImageUrl={selectedGroup?.groupImageUrl || ''}
        />
        {likedGroups?.result &&
          (likedGroups.result as UserLikedGroup[]).map((group) => (
            <GroupImage
              key={group.groupId}
              type="interest"
              groupImageUrl={group.groupImageUrl || ''}
              isSelected={selectedId === group.groupId}
              onClick={() => {
                onSelectGroup(group.groupId);
                onSelectAllGroup(null);
              }}
            />
          ))}
        <GroupImage type="add" onClick={onEditGroup} />
      </StyledGroupImageList>
    </StyledGroupImageWrapper>
  );
};

export default GroupImageList;
