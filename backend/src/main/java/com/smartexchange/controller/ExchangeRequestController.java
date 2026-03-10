package com.smartexchange.controller;

import com.smartexchange.dto.ExchangeRequestDto;
import com.smartexchange.entity.enums.RequestStatus;
import com.smartexchange.service.ExchangeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ExchangeRequestController {

    private final ExchangeService exchangeService;

    @PostMapping
    public ResponseEntity<ExchangeRequestDto> createRequest(
            @RequestParam Long learnerId,
            @RequestParam Long mentorId,
            @RequestParam Long skillId) {
        return ResponseEntity.ok(exchangeService.createRequest(learnerId, mentorId, skillId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ExchangeRequestDto> updateStatus(
            @PathVariable Long id,
            @RequestParam RequestStatus status) {
        return ResponseEntity.ok(exchangeService.updateRequestStatus(id, status));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<ExchangeRequestDto> completeSession(@PathVariable Long id) {
        return ResponseEntity.ok(exchangeService.completeSession(id));
    }

    @GetMapping("/learner/{learnerId}")
    public ResponseEntity<List<ExchangeRequestDto>> getLearnerRequests(@PathVariable Long learnerId) {
        return ResponseEntity.ok(exchangeService.getLearnerRequests(learnerId));
    }

    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<ExchangeRequestDto>> getMentorRequests(@PathVariable Long mentorId) {
        return ResponseEntity.ok(exchangeService.getMentorRequests(mentorId));
    }
}
