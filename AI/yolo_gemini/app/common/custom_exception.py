# app/common/custom_exception.py

class CustomException(Exception):
    def __init__(self, code: str, message: str):
        self.code = code
        self.message = message