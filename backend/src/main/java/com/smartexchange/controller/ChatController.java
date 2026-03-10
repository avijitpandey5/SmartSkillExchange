package com.smartexchange.controller;

import com.smartexchange.dto.ChatMessageDto;
import com.smartexchange.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<ChatMessageDto> sendMessage(
            @RequestParam Long senderId,
            @RequestParam Long receiverId,
            @RequestParam String message) {
        return ResponseEntity.ok(chatService.sendMessage(senderId, receiverId, message));
    }

    @GetMapping("/conversation")
    public ResponseEntity<List<ChatMessageDto>> getConversation(
            @RequestParam Long user1,
            @RequestParam Long user2) {
        return ResponseEntity.ok(chatService.getConversation(user1, user2));
    }
}
