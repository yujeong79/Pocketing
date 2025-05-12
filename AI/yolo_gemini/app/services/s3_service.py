import boto3
from botocore.exceptions import NoCredentialsError
import os
import uuid
from dotenv import load_dotenv

load_dotenv(dotenv_path="/yolo_gemini/secret/.env")


AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION", "ap-northeast-2")
BUCKET_NAME = os.getenv("AWS_S3_BUCKET_NAME")

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION,
)

def upload_file_to_s3(local_path: str, s3_folder: str = "photocards") -> str:
    try:
        file_name = f"{uuid.uuid4()}.jpg"
        s3_key = f"{s3_folder}/{file_name}"

        s3.upload_file(local_path, BUCKET_NAME, s3_key, ExtraArgs={"ContentType": "image/jpeg"})

        s3_url = f"https://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{s3_key}"
        return s3_url
    except NoCredentialsError:
        raise RuntimeError("AWS 인증 정보가 없습니다.")

print(f"AWS_ACCESS_KEY_ID: {AWS_ACCESS_KEY}")
print(f"AWS_SECRET_ACCESS_KEY: {AWS_SECRET_KEY}")
print(f"AWS_REGION: {AWS_REGION}")
print(f"BUCKET_NAME: {BUCKET_NAME}")
