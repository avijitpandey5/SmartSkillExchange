package com.smartexchange.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "AdminLogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin;

    @Column(nullable = false, length = 255)
    private String action;

    @CreationTimestamp
    @Column(name = "timestamp", updatable = false)
    private LocalDateTime timestamp;
}
