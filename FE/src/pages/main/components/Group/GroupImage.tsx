import { PlusIcon } from '@/assets/assets';
import { StyledGroupImage } from './GroupImageStyle';
import { artistList } from '@/mocks/artist';

interface GroupImageProps {
  type: 'interest' | 'all' | 'add';
  groupImageUrl?: string;
  onClick?: () => void;
  isSelected?: boolean;
  selectedAllGroup?: number | null;
}

const GroupImage = ({
  type,
  groupImageUrl,
  onClick,
  isSelected = false,
  selectedAllGroup,
}: GroupImageProps) => {
  const selectedGroup = selectedAllGroup
    ? artistList.find((group) => group.groupId === selectedAllGroup)
    : null;

  return (
    <StyledGroupImage onClick={onClick} data-type={type} $isSelected={isSelected}>
      {type === 'interest' && groupImageUrl && <img src={groupImageUrl} alt="그룹 이미지" />}
      {type === 'all' &&
        (selectedGroup ? (
          <img src={selectedGroup.image} alt="선택된 그룹 이미지" />
        ) : (
          <span>전체</span>
        ))}
      {type === 'add' && <img src={PlusIcon} alt="추가" />}
    </StyledGroupImage>
  );
};

export default GroupImage;
