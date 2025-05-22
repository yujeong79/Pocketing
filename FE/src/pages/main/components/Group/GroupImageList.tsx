import { useNavigate } from 'react-router-dom';
import { StyledGroupImageList, StyledGroupImageWrapper } from './GroupImageStyle';
import GroupImage from './GroupImage';
import { useLikedGroups } from '@/hooks/user/query/useLike';
import { UserLikedGroup } from '@/types/user';
import { Group } from '@/types/group';

interface GroupImageListProps {
  selectedId: number | null;
  onSelectGroup: (id: number | null) => void;
  selectedAllGroup: number | null;
  selectedGroupData: Group | null;
  onSelectAllGroup: (id: number | null) => void;
  onEditGroup: () => void;
  setSelectedGroupData: (group: Group | null) => void;
}

const GroupImageList = ({
  selectedId,
  onSelectGroup,
  selectedAllGroup,
  selectedGroupData,
  onSelectAllGroup,
  onEditGroup,
  setSelectedGroupData,
}: GroupImageListProps) => {
  const navigate = useNavigate();
  const { data: likedGroups } = useLikedGroups();

  const handleAllGroupClick = () => {
    navigate('/group/select', {
      state: {
        previousSelectedAllGroup: selectedAllGroup,
        previousSelectedGroupData: selectedGroupData,
      },
    });
  };

  return (
    <StyledGroupImageWrapper>
      <StyledGroupImageList>
        <GroupImage
          type="all"
          isSelected={selectedId === null}
          onClick={handleAllGroupClick}
          selectedAllGroup={selectedAllGroup}
          groupImageUrl={selectedGroupData?.groupImageUrl || ''}
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
                const selectedGroup: Group = {
                  groupId: group.groupId,
                  groupNameKo: group.groupNameKo,
                  groupNameEn: group.groupNameEn,
                  groupImageUrl: group.groupImageUrl || '',
                  members: null,
                  interest: true,
                };
                setSelectedGroupData(selectedGroup);
              }}
            />
          ))}
        <GroupImage type="add" onClick={onEditGroup} />
      </StyledGroupImageList>
    </StyledGroupImageWrapper>
  );
};

export default GroupImageList;
