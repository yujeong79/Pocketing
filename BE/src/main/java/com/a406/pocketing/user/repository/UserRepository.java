package com.a406.pocketing.user.repository;

import com.a406.pocketing.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(Long userId);
    Optional<User> findByOauthProviderAndProviderId(String oauthProvider, String providerId);
    Optional<User> findByNickname(String nickname);

}
