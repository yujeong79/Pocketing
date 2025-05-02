package com.a406.pocketing.exchange.dto;

public interface NearbyExchangeCardResult {

    // 카드 정보
    Long getCardId();
    Boolean isOwned();
    Long getAlbumId();
    Long getMemberId();
    String getContent();
    String getImageUrl();

    // 유저 정보
    Long getUserId();
    String getNickname();

    // 상세 정보 (카드 설명용)
    String getGroup();   // g.name_ko
    String getAlbum();   // a.title
    String getMember();  // m.name

    // 거리 정보
    Double getDistance();
}