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

	PAGE_INVALID(HttpStatus.BAD_REQUEST, "COMMON4002", "페이지 번호는 0 이상이어야 합니다."),
	SIZE_INVALID(HttpStatus.BAD_REQUEST, "COMMON4003", "페이지 크기는 1 이상 100 이하이어야 합니다."),

	// 회원 관련 에러
	USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "USER4001", "사용자가 없습니다."),

	// 그룹(Group) 관련 에러
	GROUP_NOT_FOUND(HttpStatus.NOT_FOUND, "GROUP4001", "존재하지 않는 그룹입니다."),
	GROUP_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "GROUP4002", "그룹명은 필수입니다."),

	// 멤버(Member) 관련 에러
	MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "MEMBER4001", "존재하지 않는 멤버입니다."),
	MEMBER_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "MEMBER4002", "멤버명은 필수입니다."),

	// 앨범(Album) 관련 에러
	ALBUM_NOT_FOUND(HttpStatus.NOT_FOUND, "ALBUM4001", "존재하지 않는 앨범입니다."),
	ALBUM_TITLE_REQUIRED(HttpStatus.BAD_REQUEST, "ALBUM4002", "앨범명은 필수입니다."),

	// 포토카드(PhotoCard) 관련 에러
	PHOTOCARD_NOT_FOUND(HttpStatus.NOT_FOUND, "PHOTO4001", "존재하지 않는 포토카드입니다."),
	PHOTOCARD_MEMBER_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "PHOTO4002", "멤버명은 필수입니다."),
	PHOTOCARD_MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "PHOTO4004", "존재하지 않는 멤버입니다."),

	// 시세(Price) 조회 관련 에러
	PRICE_GROUP_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "PRICE4001", "그룹명은 필수입니다."),
	PRICE_MEMBER_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "PRICE4002", "멤버명은 필수입니다."),
	PRICE_ALBUM_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "PRICE4003", "앨범명은 필수입니다."),
	PRICE_CARD_ID_REQUIRED(HttpStatus.BAD_REQUEST, "PRICE4004", "카드 ID는 필수입니다."),

	PRICE_GROUP_NOT_FOUND(HttpStatus.NOT_FOUND, "PRICE4005", "존재하지 않는 그룹입니다."),
	PRICE_MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "PRICE4006", "존재하지 않는 멤버입니다."),
	PRICE_ALBUM_NOT_FOUND(HttpStatus.NOT_FOUND, "PRICE4007", "존재하지 않는 앨범입니다."),
	PRICE_CARD_NOT_FOUND(HttpStatus.NOT_FOUND, "PRICE4008", "존재하지 않는 포토카드입니다."),
	PRICE_NO_MATCHING_POST(HttpStatus.NOT_FOUND, "PRICE4009", "조건에 맞는 판매글이 존재하지 않습니다."),

	// 판매글(Post) 등록/ 조회 관련 에러
	POST_CARD_ID_REQUIRED(HttpStatus.BAD_REQUEST, "POST4001", "카드 ID는 필수입니다."),
	POST_IMAGE_REQUIRED(HttpStatus.BAD_REQUEST, "POST4002", "실물 이미지 URL은 필수입니다."),
	POST_PRICE_REQUIRED(HttpStatus.BAD_REQUEST, "POST4003", "가격은 필수입니다."),
	POST_CARD_NOT_FOUND(HttpStatus.NOT_FOUND, "POST4004", "존재하지 않는 포토카드입니다."),

	POST_GROUP_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "POST4005", "그룹명은 필수입니다."),
	POST_MEMBER_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "POST4006", "멤버명은 필수입니다."),
	POST_GROUP_NOT_FOUND(HttpStatus.NOT_FOUND, "POST4007", "존재하지 않는 그룹입니다."),
	POST_MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "POST4008", "존재하지 않는 멤버입니다."),
	POST_ALBUM_NOT_FOUND(HttpStatus.NOT_FOUND, "POST4009", "존재하지 않는 앨범입니다."),

	POST_POST_ID_REQUIRED(HttpStatus.BAD_REQUEST, "POST4005", "판매글 ID는 필수입니다."),
	POST_NOT_FOUND(HttpStatus.NOT_FOUND, "POST4006", "존재하지 않는 판매글입니다."),

	POST_REGISTER_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "POST5001", "판매글 등록에 실패했습니다."),
	POST_LIST_FETCH_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "POST5002", "판매글 목록 조회 중 서버 오류가 발생했습니다."),
	POST_DETAIL_FETCH_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "POST5003", "판매글 상세 조회 중 서버 오류가 발생했습니다."),

	// 판매자(Seller) 리스트 조회 관련 에러
	SELLER_CARD_ID_REQUIRED(HttpStatus.BAD_REQUEST, "SELLER4001", "카드 ID는 필수입니다."),
	SELLER_CARD_NOT_FOUND(HttpStatus.NOT_FOUND, "SELLER4002", "존재하지 않는 포토카드입니다."),
	SELLER_LIST_FETCH_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "SELLER5001", "판매자 리스트 조회 중 서버 오류가 발생했습니다."),



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

