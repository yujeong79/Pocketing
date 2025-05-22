import { RefObject, useEffect, DependencyList } from 'react';

/**
 * 채팅 메시지가 추가될 때 자동으로 스크롤을 맨 아래로 이동시키는 커스텀 훅
 *
 * @param containerRef 스크롤할 컨테이너의 ref
 * @param dependencies 스크롤 이벤트를 발생시키는 의존성 배열 (예: messages)
 */
const useScrollToBottom = <T extends HTMLElement | null>(
  containerRef: RefObject<T>,
  dependencies: DependencyList = []
): { scrollToBottom: () => void } => {
  // 맨 아래로 스크롤 함수
  const scrollToBottom = () => {
    if (!containerRef.current) return;

    // 즉시 스크롤 (애니메이션 없이)
    (containerRef.current as HTMLElement).scrollTo({
      top: (containerRef.current as HTMLElement).scrollHeight,
      behavior: 'smooth',
    });

    // 약간의 지연 후 한번 더 시도 (DOM 업데이트 확실히 반영)
    setTimeout(() => {
      if (containerRef.current) {
        (containerRef.current as HTMLElement).scrollTo({
          top: (containerRef.current as HTMLElement).scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  // 의존성 배열이 변경될 때마다 스크롤
  useEffect(() => {
    if (dependencies.length > 0) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  // DOM 변경 감지 MutationObserver 설정
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new MutationObserver(() => {
      scrollToBottom();
    });

    observer.observe(containerRef.current as HTMLElement, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { scrollToBottom };
};

export default useScrollToBottom;
