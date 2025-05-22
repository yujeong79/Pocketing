import { useMemo } from 'react';
import { Group } from '@/types/group';
import { extractInitials, extractChoJung } from '@/utils/hangul';

interface UseGroupSearchProps {
  groups: Group[] | undefined;
  searchTerm: string;
}

export const useGroupSearch = ({ groups, searchTerm }: UseGroupSearchProps) => {
  const filteredGroups = useMemo(() => {
    if (!groups) return [];
    const raw = searchTerm.trim();
    if (!raw) return groups;

    // term이 순수 초성(ㄱ-ㅎ 유니코드)인지, 한글 음절인지, 아니면 일반 문자열인지 구분
    const isJamoOnly = /^[ㄱ-ㅎ]+$/.test(searchTerm);
    const decomposed = extractChoJung(raw);
    const lower = raw.toLowerCase();

    return groups.filter((group) => {
      const ko = group.groupNameKo;
      const en = group.groupNameEn.toLowerCase();

      // 1) jamo-only prefix
      if (isJamoOnly) {
        if (extractInitials(ko).startsWith(raw)) return true;
      }
      // 2) syllable prefix via decomp
      if (decomposed && extractChoJung(ko).startsWith(decomposed)) {
        return true;
      }
      // 3) 한글 원본 prefix
      if (ko.startsWith(raw)) return true;
      // 4) 영어 prefix
      if (en.startsWith(lower)) return true;

      return false;
    });
  }, [groups, searchTerm]);

  return { filteredGroups };
};
