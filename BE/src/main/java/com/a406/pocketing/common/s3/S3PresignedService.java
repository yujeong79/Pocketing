package com.a406.pocketing.common.s3;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class S3PresignedService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * @param fileName : 클라이언트로부터 받은 파일 이름
     * @param contentType : 클라이언트로부터 받은 콘텐츠 타입
     * @return S3에 업로드할 수 있는 Presigned PUT URL
     */
    public String generatePresignedUrl(String fileName, String contentType) {
        // Presigned PUT URL 만료 시간 설정(5분 유효)
        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60 * 5);

        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucket, fileName) // bucket, fileName으로 S3 객체를 지정
                .withMethod(HttpMethod.PUT) // 파일 업로드 용도
                .withExpiration(expiration); // URL 만료 시간 설정
        
        // 클라이언트가 Presigned URL로 업로드할 때 사용할 Content-Type을 명시적으로 지정
        request.addRequestParameter("Content-Type", contentType);
        
        // AWS SDK가 요청에 서명된(인증된) URL을 생성
        URL url = amazonS3.generatePresignedUrl(request);
        return url.toString();
    }
}
