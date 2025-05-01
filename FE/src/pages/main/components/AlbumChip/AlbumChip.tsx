import styled from 'styled-components';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
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

const StyledAlbumChip = styled.button<{ $isSelected: boolean }>`
  height: ${scale(18)}px;
  padding: 0 ${scale(8)}px;
  border-radius: ${scale(4)}px;
  background-color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.primary100)};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${scale(2)}px;
  font-family: 'Pretendard';
  white-space: nowrap;
  transition: all 0.2s ease;
`;

const ChipText = styled.span<{ $isSelected: boolean }>`
  font-size: ${scale(12)}px;
  font-weight: 500;
  color: ${({ $isSelected }) => ($isSelected ? 'white' : colors.gray800)};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: ${scale(12)}px;
    height: ${scale(12)}px;
  }
`;

export default AlbumChip;
