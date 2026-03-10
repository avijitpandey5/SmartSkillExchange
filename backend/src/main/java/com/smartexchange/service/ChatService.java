package com.smartexchange.service;

import com.smartexchange.dto.ChatMessageDto;
import com.smartexchange.entity.ChatMessage;
import com.smartexchange.entity.User;
import com.smartexchange.repository.ChatMessageRepository;
import com.smartexchange.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    public ChatMessageDto sendMessage(Long senderId, Long receiverId, String messageText) {
        User sender = userRepository.findById(senderId).orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId).orElseThrow(() -> new RuntimeException("Receiver not found"));

        ChatMessage message = ChatMessage.builder()
                .sender(sender)
                .receiver(receiver)
                .message(messageText)
                .build();
        message = chatMessageRepository.save(message);

        return mapToDto(message);
    }

    public List<ChatMessageDto> getConversation(Long userId1, Long userId2) {
        List<ChatMessage> list1 = chatMessageRepository.findBySenderIdOrReceiverIdOrderBySentAtAsc(userId1, userId1);
        
        return list1.stream()
                .filter(m -> (m.getSender().getId().equals(userId1) && m.getReceiver().getId().equals(userId2)) ||
                             (m.getSender().getId().equals(userId2) && m.getReceiver().getId().equals(userId1)))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private ChatMessageDto mapToDto(ChatMessage m) {
        return ChatMessageDto.builder()
                .id(m.getId())
                .senderId(m.getSender().getId())
                .senderName(m.getSender().getName())
                .receiverId(m.getReceiver().getId())
                .receiverName(m.getReceiver().getName())
                .message(m.getMessage())
                .sentAt(m.getSentAt())
                .build();
    }
}
