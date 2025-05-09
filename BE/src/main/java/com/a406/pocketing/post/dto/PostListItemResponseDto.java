package com.a406.pocketing.post.dto;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.photocard.entity.PhotoCard;
import com.a406.pocketing.post.entity.Post;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PostListItemResponseDto {
    private Long postId;
    private String groupNameKo;
    private String groupNameEn;
    private String memberName;
    private String albumTitle;
    private String postImageUrl;
    private Integer price;
    private LocalDateTime createdAt;

    public static PostListItemResponseDto from(Post post) {
        PhotoCard photoCard = post.getPhotoCard();
        Member member = photoCard.getMember();
        Group group = member.getGroup();
        Album album = photoCard.getAlbum();

        return PostListItemResponseDto.builder()
                .postId(post.getPostId())
                .groupNameKo(group.getNameKo())
                .groupNameEn(group.getNameEn())
                .memberName(member.getName())
                .albumTitle(album.getTitle())
                .postImageUrl(post.getPostImageUrl())
                .price(post.getPrice())
                .createdAt(post.getCreateAt())
                .build();
    }
}
