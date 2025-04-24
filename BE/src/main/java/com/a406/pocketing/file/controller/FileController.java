package com.a406.pocketing.file.controller;

import com.a406.pocketing.common.s3.S3PresignedService;
import com.a406.pocketing.file.dto.FileUploadRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> getPresignedUrl(@RequestBody FileUploadRequestDto fileUploadRequestDto) {
        String url = s3PresignedService.generatePresignedUrl(fileUploadRequestDto.getFileName(), fileUploadRequestDto.getContentType());
        return ResponseEntity.ok(url);
    }
}
