package com.a406.pocketing.common.apiPayload.code;

import org.springframework.http.HttpStatus;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder

public class ErrorReasonDto {
	private HttpStatus httpStatus;

	private final boolean isSuccess;
	private final String code;
	private final String message;

	public boolean getIsSuccess() {
		return isSuccess;
	}
}

