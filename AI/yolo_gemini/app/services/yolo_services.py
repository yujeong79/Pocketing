# app/services/yolo_services.py

from ultralytics import YOLO
import cv2
import numpy as np
import os
from PIL import Image
import logging
import uuid
from app.services.s3_service import upload_file_to_s3

logging.basicConfig(level=logging.INFO)

# YOLO 모델 로드(서버 시작 시 1번만)
model = YOLO("yolov8n.pt")
model.to("cuda")  # 이게 있어야 GPU로 작동!

def detect_and_crop_person(image_path):
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    #예측
    results = model.predict(source=img_rgb, conf=0.3)
    boxes = results[0].boxes
    person_class_id = 0  # COCO 기준 'person'

    # person  박스만 추출
    person_boxes = [box for box in boxes if int(box.cls[0]) == person_class_id]

    saved_files = []
    os.makedirs("/app/static/crops", exist_ok=True)

    for idx, box in enumerate(person_boxes[:6]):
        x1, y1, x2, y2 = map(int, box.xyxy[0])

        if x2 - x1 < 30 or y2 - y1 < 30:
            logging.warning("너무 작은 영역, 건너뜀")
            continue

        # 크롭도 img_rgb에서 자르기 (색상보존)
        cropped_rgb = img_rgb[y1:y2, x1:x2]
        save_path = f"app/static/crops/temp_{uuid.uuid4()}.jpg"
        Image.fromarray(cropped_rgb).save(save_path, format="JPEG")

        # S3에 업로드
        try:
            s3_url = upload_file_to_s3(save_path)
        except Exception as e:
            logging.error(f"S3 업로드 실패: {e}")
            continue

        saved_files.append({"postImageUrl": s3_url})

        # 로컬 파일은 삭제해도 좋음
        os.remove(save_path)

    return saved_files