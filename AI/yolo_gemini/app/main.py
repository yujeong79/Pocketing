# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import detect

app = FastAPI()

# CORS 설정: 프론트에서 접근 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 나중에 특정 도메인으로 제한 가능
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello YOLO-Gemini!"}
