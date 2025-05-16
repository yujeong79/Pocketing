// 서비스 워커 등록 함수
export async function registerServiceWorker() {
  // 서비스워커 지원 여부 체크
  if (!('serviceWorker' in navigator)) {
    console.warn('🚫 이 브라우저는 Service Worker를 지원하지 않습니다.');
    return null;
  }

  try {
    // register() 결과를 받아서 반환.
    const registration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    );
    console.log('✅ 서비스워커 등록 성공:', registration);
    return registration;
  } catch (error) {
     console.error('❌ 서비스워커 등록 실패:', error);
     return null;
  }

  
}