package com.smartexchange.repository;

import com.smartexchange.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findBySenderIdOrReceiverIdOrderBySentAtAsc(Long senderId, Long receiverId);
}
