# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import detect
from app.common.custom_exception import CustomException
from app.common.exception_handler import custom_exception_handler

app = FastAPI()

# CORS 설정: 프론트에서 접근 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 나중에 특정 도메인으로 제한 가능
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# YOLO 저장
app.include_router(detect.router)

# 예외 핸들러 등록
app.add_exception_handler(CustomException, custom_exception_handler)
