package com.a406.pocketing.exchange.service;

import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.exchange.dto.ExchangeLocationRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeLocationResponseDto;
import com.a406.pocketing.exchange.entity.UserLocation;
import com.a406.pocketing.exchange.entity.UserLocationHistory;
import com.a406.pocketing.exchange.repository.UserLocationHistoryRepository;
import com.a406.pocketing.exchange.repository.UserLocationRepository;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExchangeLocationServiceImpl implements ExchangeLocationService {

    private final UserRepository userRepository;
    private final UserLocationRepository userLocationRepository;
    private final UserLocationHistoryRepository userLocationHistoryRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

    /**
     * 위치 범위 설정 API
     * @param userId
     * @param requestDto
     * @return responseDto
     */
    @Override
    @Transactional
    public ExchangeLocationResponseDto registerLocation(Long userId, ExchangeLocationRequestDto requestDto) {
        Double latitude = requestDto.getLatitude();
        Double longitude = requestDto.getLongitude();
        Integer range = requestDto.getRange();
        Boolean isAutoDetected = requestDto.getIsAutoDetected();
        String locationName = requestDto.getLocationName();


        Point point = geometryFactory.createPoint(new Coordinate(longitude, latitude));
        LocalDateTime now = LocalDateTime.now();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GeneralException(USER_NOT_FOUND));
        Optional<UserLocation> existing = userLocationRepository.findById(userId);

        // 최신 위치 저장
        if(existing.isPresent()) {
            UserLocation loc = existing.get();
            loc.updateLocation(requestDto, point, LocalDateTime.now());
        } else {
            UserLocation location = UserLocation.builder()
                    .user(user)
                    .latitude(latitude)
                    .longitude(longitude)
                    .location(point)
                    .range(range)
                    .isAutoDetected(isAutoDetected)
                    .locationName(locationName)
                    .updatedAt(now)
                    .build();
            userLocationRepository.save(location);
        }



        // 최신 위치 저장

        // 이력 저장
        UserLocationHistory history = UserLocationHistory.builder()
                .user(user)
                .latitude(latitude)
                .longitude(longitude)
                .location(point)
                .range(range)
                .isAutoDetected(isAutoDetected)
                .locationName(locationName)
                .recordedAt(now)
                .build();
        userLocationHistoryRepository.save(history);

        // Redis에 위치 등록 (prefix 적용)
        String redisKey = "pocketing:geo:actives_users";
        String member = "user:" + userId;

        redisTemplate.opsForGeo().add(redisKey,
                new org.springframework.data.geo.Point(longitude, latitude), member);
        redisTemplate.expire(redisKey, Duration.ofMinutes(5));
        return ExchangeLocationResponseDto.builder()
                .latitude(latitude)
                .longitude(longitude)
                .range(range)
                .build();
    }
}
