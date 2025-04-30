import { useNavigate } from 'react-router-dom';
import { StyledGroupImageList, StyledGroupImageWrapper } from './GroupImageStyle';
import GroupImage from './GroupImage';
import { Artist } from '@/types/artist';

interface GroupImageListProps {
  groups: Artist[];
  selectedId: number | null;
  onSelectGroup: (id: number | null) => void;
}

const GroupImageList = ({ groups, selectedId, onSelectGroup }: GroupImageListProps) => {
  const navigate = useNavigate();

  return (
    <StyledGroupImageWrapper>
      <StyledGroupImageList>
        <GroupImage
          type="all"
          isSelected={selectedId === null}
          onClick={() => onSelectGroup(null)}
        />
        {groups.map((group) => (
          <GroupImage
            key={group.groupId}
            type="interest"
            groupImageUrl={group.image}
            isSelected={selectedId === group.groupId}
            onClick={() => onSelectGroup(group.groupId)}
          />
        ))}
        <GroupImage type="add" onClick={() => navigate('/group/add')} />
      </StyledGroupImageList>
    </StyledGroupImageWrapper>
  );
};

export default GroupImageList;
