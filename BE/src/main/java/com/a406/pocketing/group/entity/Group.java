package com.a406.pocketing.group.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    @Column(nullable = false, length = 50)
    private String nameKo;

    @Column(nullable = false, length = 50)
    private String nameEn;

    @Column(nullable = false)
    private String groupImageUrl;
}
