package com.a406.pocketing.user.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA
@AllArgsConstructor(access = AccessLevel.PRIVATE) // Builder
@Table(name = "users") // PostgreSQL에서 user는 예약어
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String oauthProvider;
    private String providerId;
    private String nickname;
    private String profileImageUrl;
    private Boolean isVerified;
    private String address;
    private String bank;
    private String account;

}
