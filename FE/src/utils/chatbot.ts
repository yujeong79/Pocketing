export function splitBotTextToItems(text: string) {
  // "현재 모든 포토카드는"으로 시작하는 안내문 분리
  const guideMatch = text.match(/^(현재 모든 포토카드는[^\n]*)/);
  let guide = '';
  let rest = text;
  if (guideMatch) {
    guide = guideMatch[1];
    rest = text.replace(guide, '').trim();
  }

  // "1. "으로 시작하는 부분을 기준으로 분리
  const items = rest
    .split(/(?=\d+\.\s)/g)
    .map((item) => item.trim())
    .filter(Boolean);

  // 안내문이 있으면 맨 앞에 추가
  if (guide) {
    return [guide, ...items];
  }
  return items;
}

export function formatBold(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
}

export function processBotText(text: string) {
  // "더 자세한 내용은"으로 분리
  const detailSplit = text.split(/(더 자세한 내용은.*)/);
  const mainText = detailSplit[0].trim();
  const detailText = detailSplit[1]?.trim();

  // 모든 - 앞에 줄바꿈 추가 (맨 앞 - 제외)
  const formattedMain = mainText.replace(/(?<!^)-/g, '<br/>-');

  return {
    main: formattedMain,
    detail: detailText,
  };
}
