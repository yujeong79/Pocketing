import { messaging } from './firebase';
import { getToken, onMessage } from 'firebase/messaging';
import axiosInstance from './api/auth/axiosInstance';
import { useChatStore } from './store/chatStore';
import { useToastStore } from './store/toastStore';

/**
 * 최초 토큰 요청 함수 
 * @param registration ServiceWorkerRegistration (optional)
 */
export async function requestFcmToken(
  registration?: ServiceWorkerRegistration
): Promise<string | null> {
  if (!isPushSupported()) {
    console.warn('❌ 이 브라우저는 푸시 알림을 지원하지 않습니다.');
    return null;
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('알림 권한 거부');
      return null;
    }

    // 등록 객체가 없으면 준비될 때까지 대기
    const swReg = registration || (await navigator.serviceWorker.ready);
    const token = await getToken(messaging, {
      vapidKey: 'BIULqTtkq1GzlTHMjOzncSv_GsJJE36fuyKGR0pCSDNQtLuk2fIiUxObTvw0uN9_AENBNAKhZ_DFrMVuNzZ5B_A',
      serviceWorkerRegistration: swReg,
    });

    if (token) {
      console.log('✅ FCM 토큰:', token);
      localStorage.setItem('fcmToken', token);
      await axiosInstance.post('/notification/fcm-token', { fcmToken: token });
      return token;
    }
    return null;
  } catch (err) {
    console.error('❌ FCM 토큰 요청 실패:', err);
    return null;
  }
}

/**
 * 포그라운드 메시지 리스너너
 */
export const initForegroundMessageListener = () => {
  console.log('📣 onMessage listener 등록 시작');

  onMessage(messaging, async (payload) => {
    console.log('📩 포그라운드 알림 수신:', payload);

    // 메시지 구조
    const body = payload.data?.body ?? '';
    const type = payload.data?.type;
    const roomId = payload.data?.roomId;

    /* 같은 채팅방이면 무시 */
    const currentRoomId = useChatStore.getState().roomId;
    if (type === 'CHAT' && currentRoomId !== null && Number(roomId) === currentRoomId) return;

    if (document.visibilityState === 'visible') {
      const showToast = useToastStore.getState().showToast;
      showToast('success', body);
      /* 창이 보이는 중 -> Toast 등 커스텀 UI */
    }
  });
};

/**
 * 푸시 지원 여부 유틸
 */
export const isPushSupported = (): boolean =>
  'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;

/**
 * 앱 로드 시, FCM SDK 내부에서 갱신된 토큰이 있으면 가져와서 서버에 업데이트트
 */
const TOKEN_KEY = 'fcmToken';

export async function syncFcmToken(registration?: ServiceWorkerRegistration){
  try {
    const swReg = registration || await navigator.serviceWorker.ready;
    const latest = await getToken(messaging, {
      vapidKey:
        'BIULqTtkq1GzlTHMjOzncSv_GsJJE36fuyKGR0pCSDNQtLuk2fIiUxObTvw0uN9_AENBNAKhZ_DFrMVuNzZ5B_A',
      serviceWorkerRegistration: swReg,  
    });
    if (latest && latest !== localStorage.getItem(TOKEN_KEY)) {
      console.log('FCM 토큰 갱신 감지:', latest);
      localStorage.setItem(TOKEN_KEY, latest);
      await axiosInstance.post('/notification/fcm-token', {fcmToken: latest});
    }
  } catch (e) {
    console.warn('FCM 토큰 동기화 실패:', e);
  }
}