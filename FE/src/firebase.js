// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase 콘솔에서 복사한 config
const firebaseConfig = {
  apiKey: "AIzaSyBY_KbODG9HQzyltb_oSt-Oh1bD77Z3qlk",
  authDomain: "pocketing-7a2dd.firebaseapp.com",
  projectId: "pocketing-7a2dd",
  storageBucket: "pocketing-7a2dd.appspot.com",
  messagingSenderId: "869118637468",
  appId: "1:869118637468:web:591f35eff6ce9fce210459",
  measurementId: "G-ZBLL446HH9"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 🟡 FCM 토큰 요청 함수
export const requestFcmToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BIULqTtkq1GzlTHMjOzncSv_GsJJE36fuyKGR0pCSDNQtLuk2fIiUxObTvw0uN9_AENBNAKhZ_DFrMVuNzZ5B_A", // 콘솔에서 발급받기
    });
      console.log("✅ FCM Token:", token);
      return token;
  } catch (err) {
    console.error("❌ FCM 토큰 요청 실패:", err);
    return null;
  }
};

// 🟡 포그라운드 메시지 수신 핸들러
onMessage(messaging, (payload) => {
    console.log("메시지 수신(포그라운드):", payload);
    const { title, body } = payload.notification || {};
   
    const notificationOptions = {
      body,
      icon: '/pocketing.svg'
    };
  
    if (Notification.permission === "granted") {
      new Notification(title, notificationOptions);
    }
  });
  
  export default app;
  