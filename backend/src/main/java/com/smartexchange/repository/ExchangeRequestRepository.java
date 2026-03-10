package com.smartexchange.repository;

import com.smartexchange.entity.ExchangeRequest;
import com.smartexchange.entity.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeRequestRepository extends JpaRepository<ExchangeRequest, Long> {
    List<ExchangeRequest> findByLearnerId(Long learnerId);
    List<ExchangeRequest> findByMentorId(Long mentorId);
    List<ExchangeRequest> findByStatus(RequestStatus status);
}
