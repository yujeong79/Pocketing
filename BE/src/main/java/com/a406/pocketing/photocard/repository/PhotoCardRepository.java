package com.a406.pocketing.photocard.repository;

import com.a406.pocketing.photocard.entity.PhotoCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoCardRepository extends JpaRepository<PhotoCard, Long> {
}
