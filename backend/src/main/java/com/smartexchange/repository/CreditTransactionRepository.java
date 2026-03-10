package com.smartexchange.repository;

import com.smartexchange.entity.CreditTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditTransactionRepository extends JpaRepository<CreditTransaction, Long> {
    List<CreditTransaction> findBySenderId(Long senderId);
    List<CreditTransaction> findByReceiverId(Long receiverId);
}
