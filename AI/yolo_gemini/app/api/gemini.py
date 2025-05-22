# app/api/gemini.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.gemini_service import analyze_image_async
from app.common.api_response import success
from app.common.custom_exception import CustomException
from app.common.error_code import VisionError
from app.common.success_code import GeminiSuccess
import asyncio

router = APIRouter(prefix="/vision", tags=["Gemini Vision"])


class VisionRequest(BaseModel):
    postImageUrls: List[str]  # 항상 리스트로 받음 (길이가 1일 수도 있음)


@router.post("/analyze")
async def analyze_images_with_gemini(req: VisionRequest):
    print("[📥] Gemini 분석 요청 수신됨")
    print(f"[🖼️] 요청 이미지 개수: {len(req.postImageUrls)}")

    # 입력 유효성 검증
    if not req.postImageUrls or len(req.postImageUrls) == 0:
        code, msg = VisionError.IMAGE_REQUIRED
        print("[❌] 이미지 리스트 비어 있음")
        raise CustomException(code, msg)

    if len(req.postImageUrls) > 6:
        code, msg = VisionError.TOO_MANY_IMAGES
        print("[❌] 이미지 6장 초과")
        raise CustomException(code, msg)

    print("[🚀] Gemini 분석 병렬 처리 시작")
    tasks = [analyze_image_async(url) for url in req.postImageUrls]
    results_and_errors = await asyncio.gather(*tasks, return_exceptions=True)

    results = []
    errors = []

    for i, result in enumerate(results_and_errors):
        image_url = req.postImageUrls[i]
        if isinstance(result, Exception):
            print(f"[⚠️] 분석 실패: {image_url}")
            if isinstance(result, CustomException):
                print(f"[❌] CustomException: {result.code} - {result.message}")
                errors.append({
                    "url": image_url,
                    "error": {"code": result.code, "message": result.message}
                })
            else:
                print(f"[❌] 일반 예외: {str(result)}")
                errors.append({
                    "url": image_url,
                    "error": {"code": "VISION4003", "message": str(result)}
                })
        else:
            print(f"[✅] 분석 성공: {image_url} → {result}")
            result["postImageUrl"] = image_url
            results.append(result)

    if not results and errors:
        code, msg = VisionError.ANALYSIS_FAILED
        print("[🛑] 모든 이미지 분석 실패")
        raise CustomException(code, msg)

    code, msg = GeminiSuccess.ANALYSIS_SUCCESS
    print(f"[🎉] 분석 완료: 성공 {len(results)} / 실패 {len(errors)}")

    return success(code, msg, {
        "results": results,
        "errors": errors if errors else None,
        "total": len(req.postImageUrls),
        "success": len(results),
        "failed": len(errors)
    })
