import { messaging } from './firebase';
import { getToken, deleteToken, onMessage } from 'firebase/messaging';
import axiosInstance from './api/auth/axiosInstance';
import { useChatStore } from './store/chatStore';
import { useToastStore } from './store/toastStore';

/** 로컬 스토리지 키 및 만료 주기 설정 */
const TOKEN_KEY = 'fcmToken';
const TOKEN_TS_KEY = 'fcmTokenTs';
const REUSE_PERIOD = 24 * 60 * 60 * 1000; // 1일

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_TS_KEY, Date.now().toString());
}
function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
function isStale(): boolean {
  const ts = Number(localStorage.getItem(TOKEN_TS_KEY));
  return !ts || Date.now() - ts > REUSE_PERIOD;
}

/**
 * 최초 토큰 요청 함수 
 */
export async function requestFcmToken(
  registration?: ServiceWorkerRegistration
): Promise<string | null> {
  if (!isPushSupported()) {
    console.warn('❌ 이 브라우저는 푸시 알림을 지원하지 않습니다.');
    return null;
  }

  // 1) 권한 상태 확인: granted 이면 skip, default 일 때만 requestPermission
  if (Notification.permission === 'default') {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') {
      console.warn('알림 권한 거부 또는 무응답');
      return null;
    }
  } else if (Notification.permission !== 'granted') {
    console.warn('알림 권한 거부');
    return null;
  }

  // 2) 서비스 워커 등록 대기
  const swReg = registration || (await navigator.serviceWorker.ready);

  // 3) 기존 토큰 만료 확인 후 삭제
  const existing = getStoredToken();
  if (!existing || isStale()) {
    try {
      await deleteToken(messaging);
    } catch {
      console.warn('기존 FCM 토큰 삭제 실패');
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_TS_KEY);
  }

  // 4) 새 토큰 발급
  try {
    const token = await getToken(messaging, {
      vapidKey: 'BIULqTtkq1GzlTHMjOzncSv_GsJJE36fuyKGR0pCSDNQtLuk2fIiUxObTvw0uN9_AENBNAKhZ_DFrMVuNzZ5B_A',
      serviceWorkerRegistration: swReg,
    });
    if (token) {
      console.log('✅ FCM 토큰 발급:', token);
      setToken(token);

      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        await axiosInstance.post('/notification/fcm-token', { fcmToken: token });
      }
      return token;
    }
  } catch (err) {
    console.error('❌ FCM 토큰 요청 실패:', err);
  }
  return null;
}

/** 포그라운드 메시지 리스너 */
export const initForegroundMessageListener = () => {
  console.log('📣 onMessage listener 등록 시작');
  onMessage(messaging, async (payload) => {
    console.log('📩 포그라운드 알림 수신:', payload);
    const body = payload.data?.body ?? '';
    const type = payload.data?.type;
    const roomId = payload.data?.roomId;
    const currentRoomId = useChatStore.getState().roomId;
    if (type === 'CHAT' && currentRoomId !== null && Number(roomId) === currentRoomId) return;
    if (document.visibilityState === 'visible') {
      useToastStore.getState().showToast('success', body);
    }
  });
};

/** 푸시 지원 여부 유틸 */
export const isPushSupported = (): boolean =>
  'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;

/** SDK 토큰 갱신 감지 및 서버 동기화 */
export async function syncFcmToken(registration?: ServiceWorkerRegistration) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return;
  
  try {
    const swReg = registration || (await navigator.serviceWorker.ready);
    const latest = await getToken(messaging, {
      vapidKey:
        'BIULqTtkq1GzlTHMjOzncSv_GsJJE36fuyKGR0pCSDNQtLuk2fIiUxObTvw0uN9_AENBNAKhZ_DFrMVuNzZ5B_A',
      serviceWorkerRegistration: swReg,
    });

    const stored = getStoredToken();

    // 토큰이 없거나 바뀌었거나 만료됐을 때만 동기화.
    if (latest && (latest !== stored || isStale())) {
      console.log('🔄 FCM 토큰 동기화:', latest);
      await axiosInstance.post('/notification/fcm-token', { fcmToken: latest });
      setToken(latest);
    }
  } catch (e) {
    console.warn('❌ FCM 토큰 동기화 실패:', e);
  }
}
