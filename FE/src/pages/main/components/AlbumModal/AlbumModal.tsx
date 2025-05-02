import styled from 'styled-components';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';
import scale from '@/utils/scale';
import SlideUpModal from '@/components/common/SlideUpModal';

interface AlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlbum: (albumTitle: string | null) => void;
  albums: string[];
  selectedAlbum: string | null;
}

const AlbumModal = ({ isOpen, onClose, onSelectAlbum, albums, selectedAlbum }: AlbumModalProps) => {
  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} header="앨범 선택">
      <AlbumList>
        <AlbumItem onClick={() => onSelectAlbum(null)}>전체 보기</AlbumItem>
        {albums.map((album) => (
          <AlbumItem
            key={album}
            onClick={() => onSelectAlbum(album)}
            $isSelected={album === selectedAlbum}
          >
            {album}
          </AlbumItem>
        ))}
      </AlbumList>
    </SlideUpModal>
  );
};

const AlbumList = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlbumItem = styled.div<{ $isSelected?: boolean }>`
  ${FontStyles.bodyMedium};
  color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.gray800)};
  padding: ${scale(8)}px 0;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.gray100};
  }
`;

export default AlbumModal;
