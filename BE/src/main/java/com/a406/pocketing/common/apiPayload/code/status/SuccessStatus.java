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
	USER_INFO_SUCCESS(HttpStatus.OK, "USER2002", "사용자 정보 조회 성공입니다."),
	USER_LIKE_INFO_REGISTER_SUCCESS(HttpStatus.CREATED, "USER2003", "사용자 관심 그룹 및 멤버 등록 성공입니다."),
	CHECK_NICKNAME_SUCCESS(HttpStatus.OK, "USER2004", "중복되지 않은 닉네임입니다."),
	USER_LIKE_GROUP_LIST_FETCH_SUCCESS(HttpStatus.OK, "USER2005", "관심 그룹 목록 조회 성공입니다."),
	USER_LIKE_MEMBER_LIST_FETCH_SUCCESS(HttpStatus.OK, "USER2006", "관심 멤버 목록 조회 성공입니다."),
	USER_LIKE_GROUP_DELETE_SUCCESS(HttpStatus.OK, "USER2007", "관심 그룹 삭제 성공입니다."),
	USER_LIKE_MEMBER_DELETE_SUCCESS(HttpStatus.OK, "USER2008", "관심 멤버 삭제 성공입니다."),
	USER_INFO_UPDATE_SUCCESS(HttpStatus.OK, "USER2009", "사용자 정보 수정 성공입니다."),

	// 그룹(Group) 관련 성공
	GROUP_LIST_FETCH_SUCCESS(HttpStatus.OK, "GROUP2001", "그룹 목록 조회 성공"),

	// 멤버(Member) 관련 성공
	MEMBER_LIST_FETCH_SUCCESS(HttpStatus.OK, "MEMBER2001", "멤버 목록 조회 성공"),

	// 앨범(Album) 관련 성공
	ALBUM_LIST_FETCH_SUCCESS(HttpStatus.OK, "ALBUM2001", "앨범 목록 조회 성공"),

	// 포토카드(PhotoCard) 관련 성공
	PHOTOCARD_LIST_FETCH_SUCCESS(HttpStatus.OK, "PHOTO2001", "포토카드 목록 조회 성공"),

	// 시세(Price) 조회 관련 성공
	PRICE_FETCH_SUCCESS(HttpStatus.OK, "PRICE2001", "시세 조회 성공"),

	// 판매글(Post) 관련 성공
	POST_REGISTER_SUCCESS(HttpStatus.CREATED, "POST2001", "판매글 등록 성공"),
	POST_LIST_FETCH_SUCCESS(HttpStatus.OK, "POST2002", "판매글 목록 조회 성공"),
	POST_DETAIL_FETCH_SUCCESS(HttpStatus.OK, "POST2003", "판매글 상세 조회 성공"),
	POST_UPDATE_SUCCESS(HttpStatus.OK,"POST2004", "판매글 수정 성공"),
	POST_DELETE_SUCCESS(HttpStatus.OK, "POST2005", "판매글 삭제 성공"),

	// 판매자(Seller) 리스트 관련 성공
	SELLER_LIST_FETCH_SUCCESS(HttpStatus.OK, "SELLER2001", "판매자 리스트 조회 성공"),

	//AI-매칭 관련성공
	AI_RESOLVE_SUCCESS(HttpStatus.OK, "MATCHING2001", "AI 데이터 매핑 성공"),

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
	EXCHANGE_NOTIFICATION_READ_SUCCESS(HttpStatus.OK, "EXCHANGE2012", "알림 읽음 처리 성공"),

	// 알림 관련 응답
	NOTIFICATION_TOKEN_REGISTER_SUCCESS(HttpStatus.OK, "NOTIFICATION2001", "FCM 토큰 등록 성공입니다."),

	// 채팅 관련 응답
	CHAT_ROOM_FETCH_SUCCESS(HttpStatus.OK, "CHAT2001", "채팅방 조회 성공입니다."),
	CHAT_ROOM_ENTER_SUCCESS(HttpStatus.OK, "CHAT2002", "채팅방 입장 성공입니다."),
	CHAT_UNREAD_MESSAGE_COUNT_SUCCESS(HttpStatus.OK, "CHAT2003", "안읽은 메시지 전체 개수 조회 성공입니다."),
	CHAT_MESSAGE_FETCH_SUCCESS(HttpStatus.OK, "CHAT2004", "메시지 불러오기 성공입니다."),

	// 샘플 응답
	SAMPLE_SUCCESS(HttpStatus.OK, "SAMPLE2001", "샘플 성공 입니다. 이런식으로 작성하면 됩니다.");

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
