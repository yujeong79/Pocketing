// src/utils/hangul.ts

const INITIALS = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];
const MEDIALS = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
];

/**
 * 초성만 추출 (jamo-only 검색용)
 */
export function extractInitials(str: string): string {
  return Array.from(str)
    .map((ch) => {
      const code = ch.charCodeAt(0) - 0xac00;
      if (code < 0 || code > 11171) return ch;
      const idx = Math.floor(code / (21 * 28));
      return INITIALS[idx] ?? ch;
    })
    .join('');
}

/**
 * 초성+중성(cho+jung)으로 분해 (syllable 검색용)
 */
export function extractChoJung(str: string): string {
  return Array.from(str)
    .map((ch) => {
      const code = ch.charCodeAt(0) - 0xac00;
      if (code < 0 || code > 11171) return ch;
      const cho = Math.floor(code / (21 * 28));
      const jung = Math.floor((code % (21 * 28)) / 28);
      return (INITIALS[cho] || '') + (MEDIALS[jung] || '');
    })
    .join('');
}
