package com.a406.pocketing.user.entity;

import com.a406.pocketing.user.dto.request.MyPageRequestDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"oauth_provider", "provider_id"})
        },
        indexes = {
                @Index(columnList = "provider_id, oauth_provider")
        }
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String oauthProvider;
    private String providerId;
    private String nickname;
    private String profileImageUrl;
    private Boolean isVerified;
    private String address;
    private String bank;
    private String account;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<UserLikedGroup> likedGroups = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<UserLikedMember> likedMembers = new ArrayList<>();

    public void updateUser(MyPageRequestDto myPageRequestDto) {
        if (myPageRequestDto.getNickname() != null) this.nickname = myPageRequestDto.getNickname();
        if (myPageRequestDto.getProfileImageUrl() != null) this.profileImageUrl = myPageRequestDto.getProfileImageUrl();
        if (myPageRequestDto.getAddress() != null) this.address = myPageRequestDto.getAddress();
        if (myPageRequestDto.getBank() != null) this.bank = myPageRequestDto.getBank();
        if (myPageRequestDto.getAccount() != null) this.account = myPageRequestDto.getAccount();
    }

}
