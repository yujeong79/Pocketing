package com.a406.pocketing.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // 클라이언트가 최초 WebSocket 연결을 맺을 때 접속하는 경로
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // 클라이언트 연결 경로 (ws://localhost:8080/ws)
                .setAllowedOrigins("*")
                .withSockJS(); // WebSocket 미지원 브라우저 대응
    }

    // 메시지 라우팅 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //  서버 -> 클라이언트 사용하는 경로(구독 대상)
        registry.enableSimpleBroker("/queue");

        // 클라이언트 -> 서버 사용하는 prefix
        registry.setApplicationDestinationPrefixes("/app");

        // convertAndSendToUser 사용 시 내부적으로 /user/{userId}/queue 사용
        registry.setUserDestinationPrefix("/user");
    }
}
