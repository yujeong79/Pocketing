# app/common/error_code.py

class YOLOError:
    FILE_REQUIRED = ("YOLO4001", "파일은 최소 1개 이상 필요합니다.")
    FILE_TOO_MANY = ("YOLO4002", "파일은 최대 6개까지 업로드 가능합니다.")
    NO_PERSON_DETECTION = ("YOLO4003", "포토카드가 감지되지 않았습니다.")
    CROP_FAILED = ("YOLO4004", "YOLO 크롭 중 서버 오류가 발생했습니다.")
    FILE_TYPE_INVALID = ("YOLO4005", "이미지 파일만 업로드 가능합니다.")

class VisionError:
    IMAGE_REQUIRED = ("VISION4001", "분석할 이미지 URL은 필수입니다.")
    ANALYSIS_FAILED = ("VISION4002", "이미지를 분석할 수 없습니다.")
    SERVER_ERROR = ("VISION4003", "이미지 분석 중 서버 오류가 발생했습니다.")
    API_KEY_REQUIRED = ("VISION4004", "Gemini API 키가 설정되지 않았습니다.")
    IMAGE_DOWNLOAD_FAILED = ("VISION4005", "이미지를 다운로드할 수 없습니다.")
    API_CALL_FAILED = ("VISION4006", "Gemini API 호출 중 오류가 발생했습니다.")
    RESPONSE_PARSE_FAILED = ("VISION4007", "Gemini API 응답을 파싱할 수 없습니다.")
    TOO_MANY_IMAGES = ("VISION4008", "최대 6개의 이미지만 분석 가능합니다.")
    IMAGE_TOO_LARGE = ("VISION4009", "이미지 크기가 너무 커서 처리할 수 없습니다.")