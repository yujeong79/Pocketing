import { useMemo } from 'react';
import { Member } from '@/types/member';
import { extractInitials, extractChoJung } from '@/utils/hangul';

interface UseMemberSearchProps {
  members: Member[] | undefined;
  searchTerm: string;
}

export const useMemberSearch = ({ members, searchTerm }: UseMemberSearchProps) => {
  const filteredMembers = useMemo(() => {
    if (!members) return [];
    const raw = searchTerm.trim();
    if (!raw) return members;

    const lowerRaw = raw.toLowerCase();

    // term이 순수 초성(ㄱ-ㅎ 유니코드)인지, 한글 음절인지 구분
    const isJamoOnly = /^[ㄱ-ㅎ]+$/.test(searchTerm);
    const decomposed = extractChoJung(raw);

    return members.filter((member) => {
      const name = member.name;
      const lowerName = name.toLowerCase();

      // 1) 초성 검색 (한글 이름에만 적용)
      if (isJamoOnly && /[가-힣]/.test(name)) {
        if (extractInitials(name).startsWith(raw)) return true;
      }
      // 2) 한글 음절 검색
      if (decomposed && /[가-힣]/.test(name) && extractChoJung(name).startsWith(decomposed)) {
        return true;
      }
      // 3) 한글 원본 검색
      if (/[가-힣]/.test(name) && name.startsWith(raw)) return true;
      // 4) 영어 검색 (대소문자 구분 없이)
      if (/[a-zA-Z]/.test(name) && lowerName.startsWith(lowerRaw)) return true;

      return false;
    });
  }, [members, searchTerm]);

  return { filteredMembers };
};
