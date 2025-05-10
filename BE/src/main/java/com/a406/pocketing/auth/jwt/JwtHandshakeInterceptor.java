package com.a406.pocketing.auth.jwt;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtProvider jwtProvider;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) {

//        log.info("WebSocket before handshake");

        if (request instanceof ServletServerHttpRequest servletRequest) {
            HttpServletRequest servletReq = servletRequest.getServletRequest();
            String token = servletReq.getParameter("token");

            if (token != null && !token.isBlank()) {
                Authentication authentication = jwtProvider.getAuthentication(token);
                attributes.put("user", authentication);

                log.info("Successfully authenticated user {}", authentication.getName());
            }
        }

        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {

    }
}
