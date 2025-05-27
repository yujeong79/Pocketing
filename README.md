# 📌 포토카드 거래 플랫폼 포켓팅(Pocketing)
![README_이미지](/uploads/8a489b8d0345763137a829f48bb790dc/README_이미지.png)

- 배포 URL : https://k12a406.p.ssafy.io

<br>

## ✅ 프로젝트 소개
- 포켓팅(Pocketing)은 포토카드 교환 및 온라인 판매/구매 등의 활동을 활발히 하는 K-POP 팬들을 위한 포토카드 거래 플랫폼입니다.
- 현장 교환 서비스를 통해 본인의 보유/희망 카드를 등록하면 주변의 포켓팅 사용자 중 교환 성공률이 높은 사용자를 매칭해줍니다.
- AI를 사용한 여러 장의 포토카드 이미지를 자동 인식하고 분류하여 손쉽게 판매글을 등록할 수 있습니다.
- 채팅을 통해 다른 사용자와 활발하게 거래 활동을 할 수 있습니다.

<br>

## ✅ 팀원 구성
| 김유정 | 김주원 | 김태민 | 이승희 | 한병현 | 한윤지 |
|--------|--------|--------|--------|--------|--------|
| INFRA <br> Back-End | AI <br> Back-End | Back-End | Front-End | Front-End | Back-End <br> Front-End |


<br>

## 1️⃣ 개발 환경 및 기술 스택
- Front-End : React, TypeScript, Styled-Components, Zustand, React Query
- Back-End : SpringBoot, FastAPI
- DB : Redis, PostgreSQL, ChromaDB
- 버전 및 이슈관리 : GitLab, Jira
- 협업 툴 : Notion, MatterMost
- 디자인 Figma

<br>

## 2️⃣ 프로젝트 구조
### 🌟 React
```
📦 src
├── 📁 api
├── 📁 assets
├── 📁 components
├── 📁 constants
├── 📁 hooks
├── 📁 pages
├── 📁 router
├── 📁 services
├── 📁 store
├── 📁 styles
├── 📁 types
├── 📁 utils
├── 📄 App.css
├── 📄 App.tsx
├── 📄 fcm.ts
├── 📄 firebase.ts
├── 📄 global.d.ts
├── 📄 index.css
├── 📄 main.tsx
├── 📄 serviceWorkerRegistration.ts
├── 📄 vite-env.d.ts
├── 📄 .eslintrc.json
├── 📄 .gitignore
├── 📄 .gitkeep
├── 📄 .prettierrc
├── 📄 Dockerfile
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 Jenkinsfile
└── 📄 nginx.conf
```

<br>

### 🌟 SpringBoot
```
📦 src
├── 📁 main
│ └── 📁 java
│ └── 📁 com
│ └── 📁 a406
│ └── 📁 pocketing
│ ├── 📁 album # 앨범 관련 기능
│ ├── 📁 auth # 인증 및 사용자 로그인/회원가입
│ ├── 📁 chat # 채팅 기능
│ ├── 📁 common # 공통 유틸리티, 설정 파일
│ ├── 📁 exchange # 포토카드 교환 기능
│ ├── 📁 file # 파일 업로드/다운로드 관리
│ ├── 📁 group # 그룹 관리 (예: 아이돌 그룹)
│ ├── 📁 matching # 매칭 로직 (포토카드 교환 매칭)
│ ├── 📁 member # 멤버 관리 (그룹 멤버, 사용자)
│ ├── 📁 notification # 알림 기능 (푸시 알림)
│ ├── 📁 photocard # 포토카드 관리 (등록, 조회)
│ ├── 📁 post # 게시글 관리 (판매/교환 게시글)
│ └── 📁 user # 사용자 관리 (프로필, 설정)
│ └── 📄 PocketingApplication.java # 메인 애플리케이션 파일 (Spring Boot 시작점)
│
├── 📁 resources
│ └── 📁 templates (HTML 파일)
│ └── 📁 static (정적 파일: CSS, JS, 이미지)
│ └── 📄 application.yml (Spring Boot 설정 파일)
│
├── 📁 test (테스트 코드)
│
├── 📄 .gitattributes # Git 속성 설정 파일
├── 📄 .gitignore # Git 버전 관리 제외 파일 설정
├── 📄 build.gradle # Gradle 빌드 설정 파일
├── 📄 docker-compose.local.yml # 로컬 Docker Compose 설정 파일
├── 📄 Dockerfile # Docker 이미지 빌드 설정 파일
└── 📄 gradlew # Gradle Wrapper 실행 파일
```

<br>

## 3️⃣ 역할 분담
### 🌟 김유정
- INFRA : SpringBoot 젠킨스 파이프라인 구축, React+Nginx 젠킨스 파이프라인 구축, FastAPI(Yolo+Gemini, Chatbot) 젠킨스 파이프라인 구축, EC2 및 DB 설정
- Back-End : WebSocket + STOMP를 사용한 채팅 기능 구현, 카카오 및 트위터 OAuth 구현, 회원 관련 로직 구현, 판매글 조회 로직 구현
- Data : 포토카드 초기 데이터 수집
<br>

### 🌟 김주원
- AI : 아키텍쳐 설계, 시스템 프롬프트 설계, rag 파이프라인 구현, etl 파이프라인 구현,  웹소켓을 통한 실시간 대화 처리 기능 구현, 인기 그룹과 일반 그룹에 대한 차별화된 TTL 전략 적용, 사용자 컨텍스트 유지 및 관리 시스템 개발, 검색 결과와 LLM 응답 통합 시스템 개발, 토카드 메타데이터 임베딩 및 벡터화 로직 구현, 포토카드 데이터 주기적 갱신을 위한 스케줄러 개발
- Back-End : 최저가 판매글 캐싱 구현, 포토카드 조회 api 구현
<br>

### 🌟 김태민
- Back-End : 모놀리식 구조 기반 아키텍처 설계, 위치 기반 카드 매칭 서비스 구현, FCM 기반 알림 시스템 구현
- Front-End : PWA 환경에서의 FCM 토큰 요청 및 수신 로직 구현, 서비스워커 등록 및 백그라운드 알림 처리, FCM 토큰 만료 및 재발급 관리 로직 구현
<br>

### 🌟 이승희
- Front-end : UI/UX 퍼블리싱 및 구현, React Query와 Axios를 활용한 데이터 페칭 및 캐싱, WebSocket과 STOMP를 활용한 실시간 채팅/AI챗봇 API 연동, 메인/판매/그룹 API 연동
- Design: Figma를 이용한 와이어프레임 및 프로토타입 제작
<br>

### 🌟 한병현
- Front-End : React + Vite + TypeScript 프로젝트 환경 세팅, Zustand를 활용한 전역 상태 관리 구축, 네이버 지도 API와 Geocoding을 활용하여 지도 페이지 및 지도 검색 기능 구현, S3 이미지 저장 및 호출 연동, 지도 기반 포토카드 교환 페이지 구현, 알림 페이지 구현, 프로필 페이지 구현
- Design : Figma 와이어프레임, 프로토타입 제작
<br>

### 🌟 한윤지
- AI : FastApi(Yolo+Gemini) 아키텍처 설계, Yolo 모델 인물 크롭 로직 구현, 크롭된 이미지 저장 로직 구현, 제미나이 API 연동 및 그룹, 멤버 추출
- Back-End : 등록(Post) 비즈니스 로직 설계 및 개발, Album, Group, Member, Photocard, Matching 조회 로직 구현
- Front-End : 등록페이지 fastapi와 springboot API 연동 구현, update 페이지, 제보하기 페이지 생성
<br>

## 4️⃣ 개발 기간 및 작업 관리
### 🌟 개발 기간
- 전체 개발 기간 : 2025-04-14 ~ 2025-05-22
- UI 구현 : 2025-04-28 ~ 2025-05-09
- 기능 구현 : 2025-04-24 ~ 2025-05-09
- QA : 2025-05-12 ~ 2025-05-21

### 🌟 작업 관리
- GitLab과 Jira Issue를 사용하여 진행 상황을 공유했습니다.
- 매일 아침 스크럼을 진행하며 팀원 간 진행 상황을 공유하며 작업 순서와 방향성에 대해 고민하고 Notion에 회의 내용을 기록했습니다.

<br>

## 5️⃣ 페이지별 기능
### 🌟 메인(판매글 조회)
- 메인페이지에서 본인의 관심 그룹 및 관심 아이돌을 등록 및 삭제 할 수 있습니다.
- 메인페이지에서 본인의 관심 그룹 및 관심 아이돌의 포토카드 판매글을 볼 수 있습니다.
![Pocketing_발표용](/uploads/4432f8842777858f86b133e3ccec7278/Pocketing_발표용.jpg)
<br>

### 🌟 교환
- 사용자가 보유 및 희망하는 카드를 등록할 수 있습니다.
- 등록한 보유 및 희망카드를 기반으로 주변의 사용자를 매칭합니다.
![Pocketing_발표용](/uploads/22f6cf585d08d3dc28b2d78c1484f8fe/Pocketing_발표용.jpg)
<br>

### 🌟 판매
#### 🔍 판매
![Pocketing_발표용](/uploads/a8f5b14f349d085aa522371c10a3b563/Pocketing_발표용.jpg)
<br>

#### 🔍 판매 등록
- YOLO 모델과 GEMINI를 사용하여 다수의 포토카드를 객체 인식하고 그룹 및 멤버를 분류하여 판매 과정을 단축합니다.
![Pocketing_발표용](/uploads/b7461f65ef31269b2b355455e21070c1/Pocketing_발표용.jpg)
<br>

### 🌟 챗봇
#### 🔍 챗봇
![Pocketing_발표용](/uploads/9f7cb3324f907ad1daf67c4907d75fd8/Pocketing_발표용.jpg)
<br>

#### 🔍 포토카드 조회
- 원하는 포토카드를 물어보면 챗봇이 유사한 포토카드와 해당 포토카드의 최저가 판매글을 보여줍니다.
![Pocketing_발표용](/uploads/9044bf0a5d5142629bfdd659db6dedc2/Pocketing_발표용.jpg)
<br>

### 🌟 마이페이지
- 마이페이지에서 사용자 개인정보 및 관심 그룹 및 아이돌 조회, 판매글 조회가 가능합니다.
![Pocketing_발표용](/uploads/459a0776dd6f66925a74b89133e4e279/Pocketing_발표용.jpg)
