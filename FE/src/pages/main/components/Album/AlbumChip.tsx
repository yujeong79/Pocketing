import { StyledAlbumChip, ChipText, IconWrapper } from './AlbumChipStyle';
import { FilterIcon, InactiveFilterIcon } from '@/assets/assets';

interface AlbumChipProps {
  isSelected?: boolean;
  onClick?: () => void;
}

const AlbumChip = ({ isSelected = false, onClick }: AlbumChipProps) => {
  return (
    <StyledAlbumChip $isSelected={isSelected} onClick={onClick}>
      <ChipText $isSelected={isSelected}>앨범</ChipText>
      <IconWrapper>
        <img src={isSelected ? FilterIcon : InactiveFilterIcon} alt="필터" />
      </IconWrapper>
    </StyledAlbumChip>
  );
};

export default AlbumChip;
