// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useChatStore } from './store/chatStore';

// Firebase 콘솔에서 복사한 config
const firebaseConfig = {
  apiKey: 'AIzaSyBY_KbODG9HQzyltb_oSt-Oh1bD77Z3qlk',
  authDomain: 'pocketing-7a2dd.firebaseapp.com',
  projectId: 'pocketing-7a2dd',
  storageBucket: 'pocketing-7a2dd.appspot.com',
  messagingSenderId: '869118637468',
  appId: '1:869118637468:web:591f35eff6ce9fce210459',
  measurementId: 'G-ZBLL446HH9',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 🟡 FCM 토큰 요청 함수
export const requestFcmToken = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        'BIULqTtkq1GzlTHMjOzncSv_GsJJE36fuyKGR0pCSDNQtLuk2fIiUxObTvw0uN9_AENBNAKhZ_DFrMVuNzZ5B_A', // 콘솔에서 발급받기
    });
    console.log('✅ FCM Token:', token);
    return token;
  } catch (err) {
    console.error('❌ FCM 토큰 요청 실패:', err);
    return null;
  }
};

// 🟡 포그라운드 메시지 수신 핸들러
onMessage(messaging, (payload) => {
  console.log('📩 포그라운드 알림 수신:', payload);
  const type = payload.data?.type;
  const roomId = payload.data?.roomId;
  const { title, body } = payload.notification || {};
  const currentRoomId = useChatStore.getState().currentRoomId;

  if (type == 'CHAT' && roomId === currentRoomId) {
    console.log('현재 채팅방 열려 있음 -> 알림 무시');
    return;
  }

  if (Notification.permission === 'granted' && title) {
    new Notification(title, {
      body,
      icon: '/pocketing.svg',
      data: {type, roomId},
    });
  }
});

export default app;
