package com.smartexchange.entity;

import com.smartexchange.entity.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ExchangeRequests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "learner_id", nullable = false)
    private User learner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_id", nullable = false)
    private User mentor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private RequestStatus status;

    @Column(name = "session_date")
    private LocalDateTime sessionDate;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = RequestStatus.PENDING;
        }
    }
}
