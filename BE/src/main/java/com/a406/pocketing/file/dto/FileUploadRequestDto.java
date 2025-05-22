package com.a406.pocketing.file.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileUploadRequestDto {
    private String fileName;
    private String contentType;
}
