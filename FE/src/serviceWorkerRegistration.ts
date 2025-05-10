// 서비스 워커 등록 함수
export function register(): void {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then(registration => {
            console.log('✅ Firebase Messaging SW 등록 성공:', registration);
          })
          .catch(error => {
            console.error('❌ Firebase Messaging SW 등록 실패:', error);
          });
      });
    }
  }
