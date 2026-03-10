package com.smartexchange.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "CreditTransactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreditTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender; // nullable for system/admin transactions

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @Column(nullable = false)
    private Integer amount;

    @Column(length = 255)
    private String reason;

    @CreationTimestamp
    @Column(name = "transaction_date", updatable = false)
    private LocalDateTime transactionDate;
}
