package com.a406.pocketing.common.config;

import com.a406.pocketing.auth.jwt.JwtHandshakeInterceptor;
import com.a406.pocketing.auth.jwt.JwtProvider;
import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus._UNAUTHORIZED;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtProvider jwtProvider;

    // 클라이언트가 최초 WebSocket 연결을 맺을 때 접속하는 경로
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // 클라이언트 연결 경로 (ws://localhost:8080/ws)
                .addInterceptors(new JwtHandshakeInterceptor(jwtProvider))
                .setAllowedOrigins("https://k12a406.p.ssafy.io")
//                .setAllowedOriginPatterns("*")
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

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String jwt = accessor.getFirstNativeHeader("Authorization");
                    if (jwt != null && jwt.startsWith("Bearer ")) {
                        jwt = jwt.substring(7); // "Bearer " 제거

                        if(jwtProvider.validateToken(jwt)) { // 유효한 토큰인지 검증
                            Authentication authentication = jwtProvider.getAuthentication(jwt); // 토큰 검증
                            accessor.setUser(authentication); // Principal 설정
                        }
                    } else {
                        throw new BadRequestHandler(_UNAUTHORIZED);
                    }
                }

                return message;
            }
        });
    }
}
