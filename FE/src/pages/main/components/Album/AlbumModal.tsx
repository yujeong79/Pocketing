import SlideUpModal from '@/components/common/SlideUpModal';
import { AlbumList, AlbumItem } from './AlbumModalStyle';
import { useAlbums } from '@/hooks/artist/query/useAlbums';

interface AlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlbum: (albumTitle: string | null) => void;
  groupId: number;
  selectedAlbum: string | null;
}

const AlbumModal = ({
  isOpen,
  onClose,
  onSelectAlbum,
  groupId,
  selectedAlbum,
}: AlbumModalProps) => {
  const { data: albumsData, isLoading, error } = useAlbums(groupId);
  const albums = albumsData?.result?.map((album) => album.title) ?? [];

  console.log('AlbumModal:', { groupId, isLoading, albumsData, error });

  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} header="앨범 선택" height="55vh">
      <AlbumList>
        <AlbumItem onClick={() => onSelectAlbum(null)} $isSelected={selectedAlbum === null}>
          전체 보기
        </AlbumItem>
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
