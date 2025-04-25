package com.a406.pocketing.file.controller;

import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.s3.S3PresignedService;
import com.a406.pocketing.file.dto.FileUploadRequestDto;
import com.a406.pocketing.file.dto.FileUploadResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
public class FileController {

    private final S3PresignedService s3PresignedService;

    @PostMapping("/presigned-url")
    public ApiResponse<FileUploadResponseDto> getPresignedUrl(@RequestBody FileUploadRequestDto fileUploadRequestDto) {
        String presignedUrl = s3PresignedService.generatePresignedUrl(fileUploadRequestDto.getFileName(), fileUploadRequestDto.getContentType());
        FileUploadResponseDto fileUploadResponseDto = new FileUploadResponseDto(presignedUrl);
        return ApiResponse.onSuccess(fileUploadResponseDto);
    }
}
