package com.a406.pocketing.chat.dto.response;

import com.a406.pocketing.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomParticipantResponseDto {
    private Long userId;
    private String nickname;
    private String profileImageUrl;
    private Boolean isMyInfo;

    public static ChatRoomParticipantResponseDto from(User user, Boolean isMyInfo) {
        return ChatRoomParticipantResponseDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImageUrl())
                .isMyInfo(isMyInfo)
                .build();
    }
}
