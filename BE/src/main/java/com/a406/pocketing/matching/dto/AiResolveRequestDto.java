package com.a406.pocketing.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AiResolveRequestDto {
    private String groupName;
    private String memberName;
}
