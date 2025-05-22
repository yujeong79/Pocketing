package com.a406.pocketing.post.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CheapestPostDto {
	private Long card_id;
	private Long post_id;
	private Integer price;
	private String post_image_url;
	private String nickname;
	private String last_updated;
}