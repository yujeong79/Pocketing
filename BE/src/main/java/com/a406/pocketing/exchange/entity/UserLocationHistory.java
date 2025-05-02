package com.a406.pocketing.exchange.entity;

import com.a406.pocketing.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.awt.*;
import java.time.LocalDateTime;

@Slf4j
@Entity
@Table(name = "user_location_history",
    indexes = {
        @Index(name = "idx_user_location_history_location", columnList = "location")
    })
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLocationHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_history_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @Column(columnDefinition = "GEOGRAPHY(Point, 4326", nullable = false)
    private Point location;

    @Column(nullable = false)
    private int range;

    @Column(name = "recorded_at", nullable = false)
    private LocalDateTime recordedAt;

    @Column(name = "is_auto_detected", nullable = false)
    private boolean isAutoDetected = false;

    @Column(name = "location_name")
    private String locationName;
}
