package com.a406.pocketing.common.apiPayload.code.status;

import org.springframework.http.HttpStatus;

import com.a406.pocketing.common.apiPayload.code.BaseErrorCode;
import com.a406.pocketing.common.apiPayload.code.ErrorReasonDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorStatus implements BaseErrorCode {

	// 가장 일반적인 응답
	_INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "COMMON500", "서버 에러, 관리자에게 문의 바랍니다."),
	_BAD_REQUEST(HttpStatus.BAD_REQUEST, "COMMON400", "잘못된 요청입니다."),
	_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "COMMON401", "인증이 필요합니다."),
	_FORBIDDEN(HttpStatus.FORBIDDEN, "COMMON403", "금지된 요청입니다."),

	// 회원 관련 에러 ... 더 추가해서 쓰세요
	USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "USER4001", "사용자가 없습니다."),
	MEMBER_DUPLICATE_EMAIL(HttpStatus.BAD_REQUEST, "MEMBER4002", "이미 사용 중인 이메일입니다."),
	MEMBER_INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "MEMBER4003", "비밀번호가 일치하지 않습니다."),

	// 샘플 에러
	SAMPLE_ERROR(HttpStatus.BAD_REQUEST, "SAMPLE4001", "샘플 에러 입니다. 이런식으로 작성하면 됩니다.");



	private final HttpStatus httpStatus;
	private final String code;
	private final String message;

	@Override
	public ErrorReasonDto getReason() {
		return ErrorReasonDto.builder()
			.message(message)
			.code(code)
			.isSuccess(false)
			.build();
	}

	@Override
	public ErrorReasonDto getReasonHttpStatus() {
		return ErrorReasonDto.builder()
			.message(message)
			.code(code)
			.isSuccess(false)
			.httpStatus(httpStatus)
			.build();
	}
}

