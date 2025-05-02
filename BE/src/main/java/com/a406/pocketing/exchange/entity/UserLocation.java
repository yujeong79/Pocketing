package com.a406.pocketing.exchange.entity;

import com.a406.pocketing.exchange.dto.ExchangeLocationRequestDto;
import com.a406.pocketing.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

@Slf4j
@Entity
@Table(name = "user_location",
    indexes = {
        @Index(name = "idx_user_location_location", columnList = "location")
    })
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLocation {
    @Id
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(columnDefinition = "GEOGRAPHY(Point, 4326)", nullable = false)
    private Point location;

    @Column(nullable = false)
    private Integer range;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "is_auto_detected", nullable = false)
    private Boolean isAutoDetected = false;

    @Column(name = "location_name")
    private String locationName;

    public void updateLocation(ExchangeLocationRequestDto requestDto, Point point, LocalDateTime now){
        this.latitude = requestDto.getLatitude();
        this.longitude = requestDto.getLongitude();
        this.range = requestDto.getRange();
        this.isAutoDetected = requestDto.getIsAutoDetected();
        this.locationName = requestDto.getLocationName();
        this.location = point;
        this.updatedAt = now;
    }
}
