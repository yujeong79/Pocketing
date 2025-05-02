import { PlusIcon } from '@/assets/assets';
import { StyledGroupImage } from './GroupImageStyle';

interface GroupImageProps {
  type: 'interest' | 'all' | 'add';
  groupImageUrl?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const GroupImage = ({ type, groupImageUrl, onClick, isSelected = false }: GroupImageProps) => {
  return (
    <StyledGroupImage onClick={onClick} data-type={type} $isSelected={isSelected}>
      {type === 'interest' && groupImageUrl && <img src={groupImageUrl} alt="그룹 이미지" />}
      {type === 'all' && <span>전체</span>}
      {type === 'add' && <img src={PlusIcon} alt="추가" />}
    </StyledGroupImage>
  );
};

export default GroupImage;
