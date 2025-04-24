package com.a406.pocketing.global.apiPayload.exception.handler;

import com.a406.pocketing.global.apiPayload.code.BaseErrorCode;
import com.a406.pocketing.global.apiPayload.exception.GeneralException;

public class BadRequestHandler extends GeneralException {

	public BadRequestHandler(BaseErrorCode errorCode) {
		super(errorCode);
	}
}
