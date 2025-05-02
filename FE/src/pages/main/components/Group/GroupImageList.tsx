import { useNavigate } from 'react-router-dom';
import { StyledGroupImageList, StyledGroupImageWrapper } from './GroupImageStyle';
import GroupImage from './GroupImage';
import { Artist } from '@/types/artist';

interface GroupImageListProps {
  groups: Artist[];
  selectedId: number | null;
  onSelectGroup: (id: number | null) => void;
  selectedAllGroup: number | null;
  onSelectAllGroup: (id: number | null) => void;
}

const GroupImageList = ({
  groups,
  selectedId,
  onSelectGroup,
  selectedAllGroup,
  onSelectAllGroup,
}: GroupImageListProps) => {
  const navigate = useNavigate();

  const handleAllGroupClick = () => {
    if (selectedAllGroup) {
      onSelectAllGroup(null);
    } else {
      navigate('/group/select');
    }
  };

  const selectedGroup = selectedAllGroup
    ? groups.find((group) => group.groupId === selectedAllGroup)
    : null;

  return (
    <StyledGroupImageWrapper>
      <StyledGroupImageList>
        <GroupImage
          type="all"
          isSelected={selectedId === null}
          onClick={handleAllGroupClick}
          selectedAllGroup={selectedAllGroup}
          groupImageUrl={selectedGroup?.image}
        />
        {groups.map((group) => (
          <GroupImage
            key={group.groupId}
            type="interest"
            groupImageUrl={group.image}
            isSelected={selectedId === group.groupId}
            onClick={() => {
              onSelectGroup(group.groupId);
              onSelectAllGroup(null);
            }}
          />
        ))}
        <GroupImage type="add" onClick={() => navigate('/group')} />
      </StyledGroupImageList>
    </StyledGroupImageWrapper>
  );
};

export default GroupImageList;
