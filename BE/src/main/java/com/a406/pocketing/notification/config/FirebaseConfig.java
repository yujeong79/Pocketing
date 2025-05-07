package com.a406.pocketing.notification.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class FirebaseConfig {

    @PostConstruct
    public void initialize() {
        try {
            //resources 디렉토리에 위치한 서비스 계정 키 JSON 파일을 읽어옴
            ClassPathResource resource = new ClassPathResource("firebase-service-account.json");
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(resource.getInputStream()))
                    .build();

            // FirebaseApp이 이미 초기화된 경우를 체크합니다.
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (IOException e) {
            e.printStackTrace();
            // 필요에 따라 초기화 실패 시 애플리케이션 시작을 중단하도록 예외를 던질 수 있음.
        }
    }
}
