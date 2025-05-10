import SlideUpModal from '@/components/common/SlideUpModal';
import { AlbumList, AlbumItem } from './AlbumModalStyle';
import { useAlbums } from '@/hooks/artist/query/useAlbums';

interface AlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlbum: (albumId: number | null) => void;
  groupId: number;
  selectedAlbumId: number | null;
}

const AlbumModal = ({
  isOpen,
  onClose,
  onSelectAlbum,
  groupId,
  selectedAlbumId,
}: AlbumModalProps) => {
  const { data: albumsData } = useAlbums(groupId);
  const albums = albumsData?.result ?? [];

  const handleAlbumSelect = (albumId: number | null) => {
    console.log('Album selected:', { albumId, groupId });
    onSelectAlbum(albumId);
  };

  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} header="앨범 선택" height="55vh">
      <AlbumList>
        <AlbumItem onClick={() => handleAlbumSelect(null)} $isSelected={selectedAlbumId === null}>
          전체 보기
        </AlbumItem>
        {albums.map((album) => (
          <AlbumItem
            key={album.albumId}
            onClick={() => handleAlbumSelect(album.albumId)}
            $isSelected={album.albumId === selectedAlbumId}
          >
            {album.title}
          </AlbumItem>
        ))}
      </AlbumList>
    </SlideUpModal>
  );
};

export default AlbumModal;
