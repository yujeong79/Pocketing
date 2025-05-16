# YOLO + Gemini FastAPI Server

이 프로젝트는 YOLOv8과 Gemini Vision API를 활용하여 이미지 인식 결과를 반환하는 FastAPI 기반 서버입니다.

---

## ✅ 실행 환경
- Python 3.8+
- CUDA 12.6 이상
- Docker + NVIDIA GPU 지원 환경

---

## 📦 설치 방법 (Docker)

### 1. Clone the repo
```bash
git clone https://your-repo-url.git
cd yolo_gemini
```

### 2. Build Docker image
```bash
docker build -t yolo-gemini .
```

### 3. Run container (GPU 지원 포함)
```bash
docker run --gpus all -d -p 8000:8000 --name yolo_gemini_container yolo-gemini
```

---

## 🌐 Swagger 문서 확인
```txt
http://44.197.200.188:8000/docs
```

> 서버 주소는 EC2 퍼블릭 IPv4 주소에 따라 바뀔 수 있습니다.

---

## 📁 프로젝트 구조
```
app/
 ├── api/
 │   └── detect.py
 │   └── gemini.py
 ├── common/
 │   └── api_response.py
 │   └── custom_exception.py
 │   └── error_code.py
 │   └── exception_handler.py
 │   └── success_code.py   
 ├── services/
 │   └── gemini_service.py
 │   └── s3_service.py
 │   └── yolo_service.py
 └── main.py

.env
Dockerfile
requirements.txt

```

---

## 🛠 주요 라이브러리
```text
fastapi
uvicorn
ultralytics
opencv-python
numpy
torch (CUDA 11.8)
```

---

## 🙌 개발자 주의사항
- 이미지 분석 요청은 POST /detect로 전송
- YOLO 인식 → Gemini API 요청 → 결과 반환 구조

