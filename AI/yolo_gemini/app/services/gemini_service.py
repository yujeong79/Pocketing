# app/services/gemini_service.py
import io
import os
import base64
import aiohttp
from PIL import Image

from app.common.custom_exception import CustomException
from app.common.error_code import VisionError

GEMINI_API_URL = "https://gms.p.ssafy.io/gmsapi/generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MAX_FILE_SIZE = 800000  # 약 800KB 제한
QUALITY = 80  # 적절한 품질 유지 (0-100)


async def analyze_image_async(image_url: str):
    """비동기적으로 이미지를 분석하는 함수"""
    if not GEMINI_API_KEY:
        code, msg = VisionError.API_KEY_REQUIRED
        raise CustomException(code, msg)

    async with aiohttp.ClientSession() as session:
        # 이미지 다운로드
        try:
            async with session.get(image_url) as response:
                if response.status != 200:
                    code, msg = VisionError.IMAGE_DOWNLOAD_FAILED
                    raise CustomException(code, msg)
                image_bytes = await response.read()

                # 단계적 리사이징 시도
                try:
                    # 이미지 로드
                    img = Image.open(io.BytesIO(image_bytes))

                    # 원본 형식 확인
                    original_format = img.format if img.format else 'JPEG'

                    # 점진적 리사이징을 위한 크기 목록
                    sizes = [(800, 800), (600, 600), (500, 500), (400, 400)]

                    for size in sizes:
                        # 리사이징된 이미지 생성
                        resized_img = img.copy()
                        resized_img.thumbnail(size, Image.LANCZOS)

                        # 바이트로 변환
                        buffer = io.BytesIO()
                        resized_img.save(buffer, format=original_format, quality=QUALITY)
                        resized_bytes = buffer.getvalue()

                        # Base64 인코딩
                        encoded = base64.b64encode(resized_bytes).decode("utf-8")
                        encoded_size = len(encoded)

                        # 크기가 충분히 작으면 사용
                        if encoded_size < MAX_FILE_SIZE:
                            encoded_image = encoded
                            break
                    else:
                        # 모든 크기를 시도해도 너무 큰 경우
                        # 최소 크기와 최저 품질 적용
                        final_img = img.copy()
                        final_img.thumbnail((300, 300), Image.LANCZOS)
                        buffer = io.BytesIO()
                        final_img.save(buffer, format='JPEG', quality=60)
                        encoded_image = base64.b64encode(buffer.getvalue()).decode("utf-8")

                except Exception as e:
                    # 리사이징 실패 시 원본 이미지 사용 시도
                    encoded_image = base64.b64encode(image_bytes).decode("utf-8")
                    # 그래도 너무 크면 오류 발생
                    if len(encoded_image) > MAX_FILE_SIZE * 1.5:
                        code, msg = VisionError.IMAGE_TOO_LARGE
                        raise CustomException(code, msg)

        except Exception as e:
            if isinstance(e, CustomException):
                raise e
            code, msg = VisionError.IMAGE_DOWNLOAD_FAILED
            raise CustomException(code, msg)

        # API 요청 준비
        headers = {
            "Content-Type": "application/json"
        }

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": "이 인물은 어떤 K-pop 아이돌 그룹의 누구인지 정확하게 알려줘. '그룹명의 멤버명입니다' 형식으로 말해주고, 웬만하면 한국이름(한국어)로 말해줘 예: BTS의 RM입니다. or 뉴진스의 민지입니다. 모르면 '모르겠습니다' 만 말해."
                        },
                        {
                            "inline_data": {
                                "mime_type": "image/jpeg",
                                "data": encoded_image
                            }
                        }
                    ]
                }
            ]
        }

        # API 호출
        try:
            async with session.post(
                    f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
                    json=payload,
                    headers=headers
            ) as response:
                if response.status != 200:
                    response_text = await response.text()
                    code, msg = VisionError.API_CALL_FAILED
                    raise CustomException(
                        code,
                        f"{msg} (Status: {response.status}, Response: {response_text[:100]}...)"
                    )

                response_data = await response.json()
        except aiohttp.ClientError as e:
            code, msg = VisionError.API_CALL_FAILED
            raise CustomException(code, f"{msg} ({str(e)})")
        except Exception as e:
            code, msg = VisionError.API_CALL_FAILED
            raise CustomException(code, f"{msg} ({str(e)})")

        # 응답 파싱
        try:
            text = response_data["candidates"][0]["content"]["parts"][0]["text"].strip()

            if "모르겠습니다" in text:
                return {
                    "groupName": "UNKNOWN",
                    "memberName": "UNKNOWN"
                }

            # 응답 정제
            text = text.replace("입니다", "").replace("이야", "").replace("입니다.", "")
            text = text.strip()

            # 그룹명과 멤버명 추출
            if "의" in text:
                group, member = text.split("의")
                return {
                    "groupName": group.strip(),
                    "memberName": member.strip()
                }

            # 예외 상황: 예상된 형식이 아님
            code, msg = VisionError.RESPONSE_PARSE_FAILED
            raise CustomException(code, f"{msg} (Text: {text})")

        except KeyError as e:
            code, msg = VisionError.RESPONSE_PARSE_FAILED
            raise CustomException(code, f"{msg} (Missing key: {str(e)})")
        except Exception as e:
            code, msg = VisionError.RESPONSE_PARSE_FAILED
            raise CustomException(code, f"{msg} ({str(e)})")