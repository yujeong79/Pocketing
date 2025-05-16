# app/api/detect.py

from fastapi import APIRouter, File, UploadFile
import os

from app.common.success_code import YoloSuccess
from app.services.yolo_services import detect_and_crop_person
from app.common.api_response import success
from app.common.custom_exception import CustomException
from app.common.error_code import YOLOError

router = APIRouter(prefix="/upload", tags=["YOLO Upload"])

# POST /upload/image
@router.post("/image")
async def upload_image(file: UploadFile=File(...)):
    # 파일 유효성 검사
    if not file:
        code, msg = YOLOError.FILE_REQUIRED
        raise CustomException(code, msg)

    if file.content_type not in ["image/jpeg" , "image/png"]:
        code, msg = YOLOError.FILE_TYPE_INVALID
        raise CustomException(code, msg)

    # 저장될 경로
    upload_dir = "app/static/uploads"
    os.makedirs(upload_dir, exist_ok=True)

    # 파일 저장
    file_path = os.path.join(upload_dir, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # YOLO 분석 & 크롭 -> 크롭된 이미지 리스트 반환
    print("[DEBUG] YOLO 감지 함수 진입 전")
    try:
        cropped_files = detect_and_crop_person(file_path)
        print("[DEBUG] YOLO 감지 완료:", cropped_files)
    except Exception as e:
        print("[ERROR] YOLO 감지 중 에러:", e)
        code, msg = YOLOError.CROP_FAILED
        raise CustomException(code, msg)
    
    # 크롭 실패
    if not cropped_files:
        code, msg = YOLOError.NO_PERSON_DETECTION
        raise CustomException(code, msg)

    # 너무 많이 업로드 된 경우 처리할 수도 있음 (프론트에서 방지되면 생략 가능)
    if len(cropped_files) > 6:
        code, msg = YOLOError.FILE_TOO_MANY
        raise CustomException(code, msg)

    code, msg = YoloSuccess.CROP_SUCCESS
    return success(code, msg, {"cropped_files": cropped_files})