# app/common/exception_handler.py

from fastapi import Request
from fastapi.responses import JSONResponse
from app.common.custom_exception import CustomException
from app.common.api_response import fail

async def custom_exception_handler(request: Request, exc: CustomException):
    return JSONResponse(status_code=400, content=fail(exc.code, exc.message))