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

	// 현장 교환 관련 에러
	EXCHANGE_ALBUM_NOT_FOUND(HttpStatus.BAD_REQUEST, "EXCHANGE4001", "존재하지 않는 앨범입니다."),
	EXCHANGE_MEMBER_NOT_FOUND(HttpStatus.BAD_REQUEST,"EXCHANGE4002", "존재하지 않는 멤버입니다."),
	EXCHANGE_CARD_EXISTS(HttpStatus.CONFLICT, "EXCHANGE4003", "이미 등록된 카드입니다."),
	EXCHANGE_INVALID_LOCATION(HttpStatus.BAD_REQUEST, "EXCHANGE4004", "위도/경도 값이 유효하지 않습니다."),
	EXCHANGE_DUPLICATE_REQUEST(HttpStatus.CONFLICT, "EXCHANGE4005", "이미 동일한 교환 요청이 존재합니다."),
	EXCHANGE_CARD_NOT_FOUND(HttpStatus.BAD_REQUEST, "EXCHANGE4006", "존재하지 않는 카드입니다."),
	EXCHANGE_ALREADY_TRADING(HttpStatus.CONFLICT, "EXCHANGE4007", "이미 해당 사용자와 거래가 진행 중입니다."),
	EXCHANGE_REQUEST_OR_USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "EXCHANGE4008", "존재하지 않는 요청 ID 또는 사용자 ID입니다."),
	EXCHANGE_ALREADY_PROCESSED(HttpStatus.BAD_REQUEST, "EXCHANGE4009", "이미 처리된 요청입니다."),
	EXCHANGE_REQUEST_NOT_FOUND(HttpStatus.BAD_REQUEST, "EXCHANGE4010", "존재하지 않는 요청입니다."),
	EXCHANGE_NOTIFICATION_FETCH_ERROR(HttpStatus.BAD_REQUEST, "EXCHANGE4011", "알림 조회에 실패했습니다."),
	EXCHANGE_DUPLICATE_CHECK_ERROR(HttpStatus.BAD_REQUEST, "EXCHANGE4012", "요청 확인 중 오류가 발생했습니다."),
	EXCHANGE_REQUEST_LIMIT_FETCH_ERROR(HttpStatus.BAD_REQUEST, "EXCHANGE4013", "요청 수 제한 정보 조회 실패"),
	EXCHANGE_NOTIFICATION_READ_ERROR(HttpStatus.BAD_REQUEST, "EXCHANGE4014", "알림 읽음 처리 실패"),
	EXCHANGE_RECEIVED_REQUESTS_FETCH_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "EXCHANGE5001", "서버 오류로 요청을 불러 올 수 없습니다."),
	EXCHANGE_ACCEPT_REQUEST_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "EXCHANGE5002", "서버 오류로 요청을 수락하지 못했습니다."),
	EXCHANGE_REJECT_REQUEST_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "EXCHANGE5003", "서버 오류로 요청을 거절하지 못했습니다."),

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

