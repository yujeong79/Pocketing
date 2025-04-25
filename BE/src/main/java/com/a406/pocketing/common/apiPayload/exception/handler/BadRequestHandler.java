package com.a406.pocketing.common.apiPayload.exception.handler;

import com.a406.pocketing.common.apiPayload.code.BaseErrorCode;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;

public class BadRequestHandler extends GeneralException {

	public BadRequestHandler(BaseErrorCode errorCode) {
		super(errorCode);
	}
}
