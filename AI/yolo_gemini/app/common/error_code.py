# app/common/error_code.py

class YOLOError:
    FILE_REQUIRED = ("YOLO4001", "파일은 최소 1개 이상 필요합니다.")
    FILE_TOO_MANY = ("YOLO4002", "파일은 최대 6개까지 업로드 가능합니다.")
    NO_PERSON_DETECTION = ("YOLO4003", "포토카드가 감지되지 않았습니다.")
    CROP_FAILED = ("YOLO4004", "YOLO 크롭 중 서버 오류가 발생했습니다.")
    FILE_TYPE_INVALID = ("YOLO4005", "이미지 파일만 업로드 가능합니다.")