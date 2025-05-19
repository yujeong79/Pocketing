importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBY_KbODG9HQzyltb_oSt-Oh1bD77Z3qlk",
  authDomain: "pocketing-7a2dd.firebaseapp.com",
  projectId: "pocketing-7a2dd",
  storageBucket: "pocketing-7a2dd.appspot.com",
  messagingSenderId: "869118637468",
  appId: "1:869118637468:web:591f35eff6ce9fce210459",
  measurementId: "G-ZBLL446HH9"
});

// **여기에서 반드시 정의해야 합니다!**
const messaging = firebase.messaging();

// 2) 백그라운드 전용 메시지 처리
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};

  self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
    const isVisible = clients.some(c => c.visibilityState === "visible");
    if (isVisible) {
      console.log("[SW] 포그라운드 → background 메시지 처리 안 함");
      return;
    }

    console.log("[SW] 백그라운드 → 기본 알림 표시", data);
    const title = data.title || "알림";
    self.registration.showNotification(title, {
      body: data.body || "",
      icon: "/icon-192.png",
      data,
    });
  });
});

// 이벤트 핸들러: 알림 클릭 시 버튼 action에 따라 분기 처리
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const { type, roomId} = event.notification.data || {};
  const BASE_URL =
    self.location.hostname === 'localhost'
      ? 'http://localhost:5173'
      : 'https://k12a406.p.ssafy.io';

    let url = BASE_URL;  

  if (type === "CHAT" && roomId) {
    url = `${BASE_URL}/message/${roomId}`;
  } else if (type === "EXCHANGE") {
    url = `${BASE_URL}/alarm`;
  } 

  event.waitUntil(
    self.clients.openWindow(url));
  });
