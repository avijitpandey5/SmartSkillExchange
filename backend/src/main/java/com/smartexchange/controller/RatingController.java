package com.smartexchange.controller;

import com.smartexchange.dto.RatingDto;
import com.smartexchange.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class RatingController {

    private final RatingService ratingService;

    @PostMapping
    public ResponseEntity<RatingDto> rateSession(
            @RequestParam Long sessionId,
            @RequestParam Long learnerId,
            @RequestParam Long mentorId,
            @RequestParam Integer rating,
            @RequestParam String feedback) {
        return ResponseEntity.ok(ratingService.rateSession(sessionId, learnerId, mentorId, rating, feedback));
    }

    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<RatingDto>> getMentorRatings(@PathVariable Long mentorId) {
        return ResponseEntity.ok(ratingService.getMentorRatings(mentorId));
    }
}
