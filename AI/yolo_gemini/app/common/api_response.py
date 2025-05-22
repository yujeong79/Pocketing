# app/common/api_response.py

def success(code: str, message: str, result: dict | list | None = None):
    return {
        "isSuccess": True,
        "code": code,
        "message": message,
        "result": result,
    }

def fail(code: str, message: str) :
    return {
        "isSuccess": False,
        "code": code,
        "message": message,
        "result": None,
    }
