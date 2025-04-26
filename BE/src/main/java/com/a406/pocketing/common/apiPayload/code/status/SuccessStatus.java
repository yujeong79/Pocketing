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
	USERINFO_SUCCESS(HttpStatus.OK, "USER2002", "사용자 정보 조회 성공입니다."),

	// 현장 교환 관련 응답
	EXCHANGE_CARD_REGISTER_SUCCESS(HttpStatus.OK, "EXCHANGE2001", "희망카드/보유카드가 등록되었습니다."),
	EXCHANGE_LOCATION_SAVE_SUCCESS(HttpStatus.OK, "EXCHANGE2002","사용자 위치가 성공적으로 저장되었습니다."),
	EXCHANGE_AVAILABLE_USERS_FOUND_SUCCESS(HttpStatus.OK, "EXCHANGE2003", "반경 내 교환 가능 사용자 목록입니다."),
	EXCHANGE_REQUEST_REGISTER_SUCCESS(HttpStatus.OK, "EXCHANGE2004", "교환 요청이 성공적으로 등록되었습니다."),
	EXCHANGE_RECEIVED_REQUESTS_SUCCESS(HttpStatus.OK, "EXCHANGE2005", "받은 요청 목록을 성공적으로 조회했습니다."),
	EXCHANGE_ACCEPT_REQUEST_SUCCESS(HttpStatus.OK, "EXCHANGE2006", "요청을 수락하고 채팅방이 생성되었습니다."),
	EXCHANGE_REJECT_REQUEST_SUCCESS(HttpStatus.OK, "EXCHANGE2007", "요청을 거절했습니다."),
	EXCHANGE_REQUEST_STATUS_FETCH_SUCCESS(HttpStatus.OK, "EXCHANGE2008", "교환 요청 상태 조회에 성공했습니다."),
	EXCHANGE_NOTIFICATION_LIST_FETCH_SUCCESS(HttpStatus.OK, "EXCHANGE2009", "알림 목록 조회 성공"),
	EXCHANGE_DUPLICATE_CHECK_SUCCESS(HttpStatus.OK, "EXCHANGE2010", "중복 요청 여부 확인 성공"),
	EXCHANGE_REQUEST_LIMIT_FETCH_SUCCESS(HttpStatus.OK, "EXCHANGE2011", "요청 가능 수량 조회 성공"),
	EXCHANGE_NOTIFICATION_READ_SUCCESS(HttpStatus.OK, "EXCHANGE2012", "알림 읽음 처리 성공");


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
