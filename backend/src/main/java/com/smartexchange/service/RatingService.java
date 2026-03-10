package com.smartexchange.service;

import com.smartexchange.dto.RatingDto;
import com.smartexchange.entity.ExchangeRequest;
import com.smartexchange.entity.Rating;
import com.smartexchange.entity.User;
import com.smartexchange.repository.ExchangeRequestRepository;
import com.smartexchange.repository.RatingRepository;
import com.smartexchange.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final ExchangeRequestRepository exchangeRequestRepository;
    private final UserRepository userRepository;

    public RatingDto rateSession(Long sessionId, Long learnerId, Long mentorId, Integer ratingValue, String feedback) {
        ExchangeRequest session = exchangeRequestRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        User learner = userRepository.findById(learnerId).orElseThrow();
        User mentor = userRepository.findById(mentorId).orElseThrow();

        if (ratingValue < 1 || ratingValue > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        Rating rating = Rating.builder()
                .session(session)
                .learner(learner)
                .mentor(mentor)
                .rating(ratingValue)
                .feedback(feedback)
                .build();
        rating = ratingRepository.save(rating);

        return mapToDto(rating);
    }

    public List<RatingDto> getMentorRatings(Long mentorId) {
        return ratingRepository.findByMentorId(mentorId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private RatingDto mapToDto(Rating r) {
        return RatingDto.builder()
                .id(r.getId())
                .sessionId(r.getSession().getId())
                .learnerId(r.getLearner().getId())
                .learnerName(r.getLearner().getName())
                .mentorId(r.getMentor().getId())
                .mentorName(r.getMentor().getName())
                .rating(r.getRating())
                .feedback(r.getFeedback())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
