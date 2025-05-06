package com.a406.pocketing.auth.jwt;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.user.dto.response.UserResponseDto;
import com.a406.pocketing.user.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request); // 1. AccessToken 가져오기

        if (token != null && jwtProvider.validateToken(token)) {
            Long userId = jwtProvider.getUserId(token); // 2. 토큰 디코딩 -> userId 추출
            UserResponseDto userDto = userService.findById(userId); // 3. DB에서 유저 조회

            // 4. Spring Security가 이해할 수 있도록 UserDetails로 포장
            CustomUserDetails userDetails = new CustomUserDetails(userDto);
            
            // 5. 인증 객체 생성
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            // 6. 인증 컨텍스트 등록
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 7. 다음 필터 또는 컨트롤러로 이동
        filterChain.doFilter(request, response);

    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

}
