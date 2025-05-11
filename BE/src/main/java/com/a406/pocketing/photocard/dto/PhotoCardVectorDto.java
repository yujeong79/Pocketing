package com.a406.pocketing.photocard.dto;

import com.a406.pocketing.photocard.entity.PhotoCard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
public class PhotoCardVectorDto {
	private Long card_id;
	private String card_image_url;
	private Long member_id;
	private Long album_id;
	private Long group_id;
	private String member_name;
	private String group_name;
	private String album_name;
	private List<String> tag;
	private Object embedding;

	public static PhotoCardVectorDto from(PhotoCard photocard) {
		if (photocard == null) {
			return null;
		}

		List<String> tags = photocard.getTags() != null ? photocard.getTags() : List.of();

		PhotoCardVectorDto.PhotoCardVectorDtoBuilder builder = PhotoCardVectorDto.builder()
			.card_id(photocard.getCardId())
			.card_image_url(photocard.getCardImageUrl())
			.tag(tags)
			.embedding(null);

		if (photocard.getMember() != null) {
			builder
				.member_id(photocard.getMember().getMemberId())
				.member_name(photocard.getMember().getName());

			if (photocard.getMember().getGroup() != null) {
				builder
					.group_id(photocard.getMember().getGroup().getGroupId())
					.group_name(photocard.getMember().getGroup().getNameKo());
			}
		}

		if (photocard.getAlbum() != null) {
			builder
				.album_id(photocard.getAlbum().getAlbumId())
				.album_name(photocard.getAlbum().getTitle());
		}

		return builder.build();
	}

	public static List<PhotoCardVectorDto> fromList(List<PhotoCard> photocards) {
		return photocards.stream()
			.map(PhotoCardVectorDto::from)
			.collect(Collectors.toList());
	}
}