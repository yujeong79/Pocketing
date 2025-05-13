import { useMemo } from 'react';
import { Album } from '@/types/album';
import { extractInitials, extractChoJung } from '@/utils/hangul';

interface UseAlbumSearchProps {
  albums: Album[] | undefined;
  searchTerm: string;
}

export const useAlbumSearch = ({ albums, searchTerm }: UseAlbumSearchProps) => {
  const filteredAlbums = useMemo(() => {
    if (!albums) return [];
    const raw = searchTerm.trim();
    if (!raw) return albums;

    const lowerRaw = raw.toLowerCase();

    // term이 순수 초성(ㄱ-ㅎ 유니코드)인지, 한글 음절인지 구분
    const isJamoOnly = /^[ㄱ-ㅎ]+$/.test(searchTerm);
    const decomposed = extractChoJung(raw);

    return albums.filter((album) => {
      const title = album.title;
      const lowerTitle = title.toLowerCase();

      // 1) 초성 검색 (한글 제목에만 적용)
      if (isJamoOnly && /[가-힣]/.test(title)) {
        if (extractInitials(title).startsWith(raw)) return true;
      }
      // 2) 한글 음절 검색
      if (decomposed && /[가-힣]/.test(title) && extractChoJung(title).startsWith(decomposed)) {
        return true;
      }
      // 3) 한글 원본 검색
      if (/[가-힣]/.test(title) && title.startsWith(raw)) return true;
      // 4) 영어 검색 (대소문자 구분 없이)
      if (/[a-zA-Z]/.test(title) && lowerTitle.startsWith(lowerRaw)) return true;

      return false;
    });
  }, [albums, searchTerm]);

  return { filteredAlbums };
};
