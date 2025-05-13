
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

self.addEventListener("push", (event) => {
    const wrapper = event.data?.json() ?? {};

    const data = wrapper.data ?? wrapper;

    console.log('[SW] push 이벤트 수신 ✅', data);
    
    const title = data.title || "알림";

    self.registration.showNotification(title, {
      body: data.body || '',
      icon: '/pocketing.svg',                  // 경로 확인
      data,                                   // 클릭 핸들러에서 사용
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
    url = `${BASE_URL}/chat/${roomId}`;
  } else if (type === "EXCHANGE") {
    url = `${BASE_URL}/notifications`;
  } 

  event.waitUntil(
    self.clients.openWindow(url));
  });
