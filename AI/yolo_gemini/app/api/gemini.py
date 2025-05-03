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
    # 입력 유효성 검증
    if not req.postImageUrls or len(req.postImageUrls) == 0:
        code, msg = VisionError.IMAGE_REQUIRED
        raise CustomException(code, msg)

    # 이미지 개수 제한 (최대 6개)
    if len(req.postImageUrls) > 6:
        code, msg = VisionError.TOO_MANY_IMAGES
        raise CustomException(code, msg)

    # 모든 이미지에 대해 병렬 처리
    tasks = [analyze_image_async(url) for url in req.postImageUrls]
    results_and_errors = await asyncio.gather(*tasks, return_exceptions=True)

    results = []
    errors = []

    for i, result in enumerate(results_and_errors):
        if isinstance(result, Exception):
            if isinstance(result, CustomException):
                errors.append({
                    "url": req.postImageUrls[i],
                    "error": {"code": result.code, "message": result.message}
                })
            else:
                errors.append({
                    "url": req.postImageUrls[i],
                    "error": {"code": "VISION4003", "message": str(result)}
                })
        else:
            result["postImageUrl"] = req.postImageUrls[i]
            results.append(result)

    if not results and errors:
        # 모든 이미지 분석 실패
        code, msg = VisionError.ANALYSIS_FAILED
        raise CustomException(code, msg)

    # success_code에서 정의된 성공 코드 사용
    code, msg = GeminiSuccess.ANALYSIS_SUCCESS

    # 통일된 응답 형식
    return success(code, msg, {
        "results": results,
        "errors": errors if errors else None,
        "total": len(req.postImageUrls),
        "success": len(results),
        "failed": len(errors)
    })



