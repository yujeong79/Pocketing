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
    print(f"\n[🔗] 이미지 다운로드 시작: {image_url}")

    if not GEMINI_API_KEY:
        code, msg = VisionError.API_KEY_REQUIRED
        print("[❌] GEMINI_API_KEY 누락됨")
        raise CustomException(code, msg)

    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(image_url) as response:
                print(f"[🌐] 이미지 GET 응답 코드: {response.status}")
                if response.status != 200:
                    response_text = await response.text()
                    print(f"[❌] 이미지 다운로드 실패: {response_text[:100]}")
                    code, msg = VisionError.IMAGE_DOWNLOAD_FAILED
                    raise CustomException(code, msg)

                image_bytes = await response.read()
                print(f"[📦] 이미지 크기 (bytes): {len(image_bytes)}")

                # PIL 이미지 로드
                try:
                    img = Image.open(io.BytesIO(image_bytes))
                    original_format = img.format or 'JPEG'
                    sizes = [(800, 800), (600, 600), (500, 500), (400, 400)]

                    for size in sizes:
                        resized_img = img.copy()
                        resized_img.thumbnail(size, Image.LANCZOS)
                        buffer = io.BytesIO()
                        resized_img.save(buffer, format=original_format, quality=QUALITY)
                        resized_bytes = buffer.getvalue()
                        encoded = base64.b64encode(resized_bytes).decode("utf-8")

                        if len(encoded) < MAX_FILE_SIZE:
                            print(f"[✅] 적절한 크기 선택됨: {size} → {len(encoded)} bytes (base64)")
                            encoded_image = encoded
                            break
                    else:
                        print("[⚠️] 리사이징 모두 실패, 최소 이미지 사용")
                        final_img = img.copy()
                        final_img.thumbnail((300, 300), Image.LANCZOS)
                        buffer = io.BytesIO()
                        final_img.save(buffer, format='JPEG', quality=60)
                        encoded_image = base64.b64encode(buffer.getvalue()).decode("utf-8")

                except Exception as e:
                    print(f"[⚠️] 리사이징 실패, 원본 이미지 사용 시도: {e}")
                    encoded_image = base64.b64encode(image_bytes).decode("utf-8")
                    if len(encoded_image) > MAX_FILE_SIZE * 1.5:
                        print(f"[❌] 이미지가 너무 큼: {len(encoded_image)} bytes")
                        code, msg = VisionError.IMAGE_TOO_LARGE
                        raise CustomException(code, msg)

        except Exception as e:
            if isinstance(e, CustomException):
                raise e
            print(f"[❌] 이미지 다운로드 중 에러: {e}")
            code, msg = VisionError.IMAGE_DOWNLOAD_FAILED
            raise CustomException(code, msg)

        headers = {
            "Content-Type": "application/json"
        }

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": "이 인물은 어떤 K-pop 아이돌 그룹의 누구인지 정확하게 알려줘. '그룹명의 멤버명입니다' 형식으로 말해주고, 웬만하면 한국어 활동명(한국어)으로 말해줘 근데 BTS의 RM 같은 경우는 예외로. 예: BTS의 RM입니다. or 뉴진스의 민지입니다. 모르면 '모르겠습니다' 만 말해."
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

        print("[🚀] Gemini API 호출 시작")

        try:
            async with session.post(
                f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
                json=payload,
                headers=headers
            ) as response:
                print(f"[📡] Gemini 응답 코드: {response.status}")
                if response.status != 200:
                    response_text = await response.text()
                    print(f"[❌] Gemini API 실패 응답: {response_text[:200]}")
                    code, msg = VisionError.API_CALL_FAILED
                    raise CustomException(
                        code,
                        f"{msg} (Status: {response.status}, Response: {response_text[:100]}...)"
                    )

                response_data = await response.json()

        except aiohttp.ClientError as e:
            print(f"[❌] Gemini API 통신 오류: {e}")
            code, msg = VisionError.API_CALL_FAILED
            raise CustomException(code, f"{msg} ({str(e)})")
        except Exception as e:
            print(f"[❌] Gemini API 예외: {e}")
            code, msg = VisionError.API_CALL_FAILED
            raise CustomException(code, f"{msg} ({str(e)})")

        try:
            text = response_data["candidates"][0]["content"]["parts"][0]["text"].strip()
            print(f"[🔍] Gemini 응답 텍스트: {text}")

            if "모르겠습니다" in text:
                return {
                    "groupName": "UNKNOWN",
                    "memberName": "UNKNOWN"
                }

            text = text.replace("입니다", "").replace("이야", "").replace("입니다.", "").strip()

            if "의" in text:
                group, member = text.split("의")
                return {
                    "groupName": group.strip(),
                    "memberName": member.strip()
                }

            print(f"[❌] 예상하지 못한 형식: {text}")
            code, msg = VisionError.RESPONSE_PARSE_FAILED
            raise CustomException(code, f"{msg} (Text: {text})")

        except KeyError as e:
            print(f"[❌] 응답 파싱 중 키 오류: {e}")
            code, msg = VisionError.RESPONSE_PARSE_FAILED
            raise CustomException(code, f"{msg} (Missing key: {str(e)})")
        except Exception as e:
            print(f"[❌] 응답 파싱 예외: {e}")
            code, msg = VisionError.RESPONSE_PARSE_FAILED
            raise CustomException(code, f"{msg} ({str(e)})")
