package com.a406.pocketing.common.apiPayload.code.status;

import org.springframework.http.HttpStatus;

import com.a406.pocketing.common.apiPayload.code.BaseCode;
import com.a406.pocketing.common.apiPayload.code.ReasonDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor

public enum SuccessStatus implements BaseCode {

	// 일반적인 응답
	_OK(HttpStatus.OK, "COMMON200", "성공입니다."),

	// 사용자 관련 응답
	SIGNUP_SUCCESS(HttpStatus.OK, "USER2000", "회원가입 성공입니다."),
	LOGIN_SUCCESS(HttpStatus.OK, "USER2001", "로그인 성공입니다."),
	USERINFO_SUCCESS(HttpStatus.OK, "USER2002", "사용자 정보 조회 성공입니다.");

	// 위에처럼 더 만들어서 쓰세요~!

	private final HttpStatus httpStatus;
	private final String code;
	private final String message;

	@Override
	public ReasonDto getReason() {
		return ReasonDto.builder()
			.message(message)
			.code(code)
			.isSuccess(true)
			.build();
	}

	@Override
	public ReasonDto getReasonHttpStatus() {
		return ReasonDto.builder()
			.message(message)
			.code(code)
			.isSuccess(true)
			.httpStatus(httpStatus)
			.build()
			;
	}
}
