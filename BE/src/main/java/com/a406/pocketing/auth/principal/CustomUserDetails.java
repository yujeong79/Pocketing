package com.a406.pocketing.auth.principal;

import com.a406.pocketing.user.dto.UserResponseDto;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class CustomUserDetails implements UserDetails {

    private final Long userId;
    private final String nickname;
    private final String profileImageUrl;

    public CustomUserDetails(UserResponseDto user) {
        this.userId = user.getUserId();
        this.nickname = user.getNickname();
        this.profileImageUrl = user.getProfileImageUrl();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override public String getPassword() { return null; }
    @Override public String getUsername() { return null; }
}
