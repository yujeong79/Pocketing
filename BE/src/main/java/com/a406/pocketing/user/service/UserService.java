package com.a406.pocketing.user.service;

import com.a406.pocketing.auth.dto.LoginResponseDto;
import com.a406.pocketing.auth.dto.SignupRequestDto;
import com.a406.pocketing.user.dto.UserLikedGroupResponseDto;
import com.a406.pocketing.user.dto.UserLikedInfoRequestDto;
import com.a406.pocketing.user.dto.UserLikedMemberResponseDto;
import com.a406.pocketing.user.dto.UserResponseDto;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.entity.UserLikedGroup;

import java.util.List;

public interface UserService {

    LoginResponseDto signup(SignupRequestDto signupRequestDto);
    void registerLikedInfo(Long userId, UserLikedInfoRequestDto likedInfoRequestDto);
    void registerLikedGroup(Long userId, List<UserLikedInfoRequestDto.LikedGroupDto> likedGroupList);
    void registerLikedMember(User user, List<Long> likedMemberList);
    List<UserLikedGroupResponseDto> getUserLikedGroup(Long userId);
    List<UserLikedMemberResponseDto> getUserLikedMemberByGroup(Long userId, Long groupId);
    UserResponseDto findById(Long userId);
    void deleteLikedGroup(Long userId, Long groupId);
    void deleteLikedMember(Long userId, Long memberId);
}
