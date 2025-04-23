package com.a406.pocketing.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
public class User {
    @Id
    private Long id;
}
