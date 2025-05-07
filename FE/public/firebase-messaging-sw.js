
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

const messaging = firebase.messaging();

self.addEventListener("push", (event) => {
    const data = event.data?.json() || {};
    const title = data.notification?.title || "알림";
    const options = {
      body: data.notification?.body || "",
      icon: "/pocketing.svg"
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });

// 이벤트 핸들러: 알림 클릭 시 버튼 action에 따라 분기 처리
self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("https://j12a707.p.ssafy.io/notifications"));
  });
