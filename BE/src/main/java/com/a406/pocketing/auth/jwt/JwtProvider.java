package com.a406.pocketing.auth.jwt;

import com.a406.pocketing.auth.config.JwtProperties;
import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.auth.principal.CustomUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final JwtProperties jwtProperties;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtTokenDto generateToken(Long userId) {
        Date now = new Date();

        String accessToken = Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtProperties.getExpiration() * 60 * 1000))
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecret())
                .compact();

        return new JwtTokenDto(accessToken);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public Long getUserId(String token) {
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token).getBody();
        return Long.parseLong(claims.getSubject());
    }

    public Authentication getAuthentication(String token) {
        Long userId = getUserId(token);
        CustomUserDetails userDetails = customUserDetailsService.loadUserByUserId(userId);
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}
