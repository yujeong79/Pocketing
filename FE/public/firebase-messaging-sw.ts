
/// <reference lib="webworker" />

export {};// 타입스크립트 모듈 인식

declare const firebase: any; // importScripts로 로드한 firebase 타입 선언
declare const self: ServiceWorkerGlobalScope; // 타입스크립트가 self와 관련 API 인식하도록 설정

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

self.addEventListener("push", (event: PushEvent) => {
    const data = event.data?.json() || {};
    const title = data.notification?.title || "알림";
    const options: NotificationOptions = {
      body: data.notification?.body || "",
      icon: "/pocketing.svg"
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });

// 이벤트 핸들러: 알림 클릭 시 버튼 action에 따라 분기 처리
self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow("https://j12a707.p.ssafy.io/notifications"));
  });
