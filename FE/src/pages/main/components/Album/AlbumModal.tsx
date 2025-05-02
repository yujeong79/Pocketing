import SlideUpModal from '@/components/common/SlideUpModal';
import { AlbumList, AlbumItem } from './AlbumModalStyle';

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

export default AlbumModal;
