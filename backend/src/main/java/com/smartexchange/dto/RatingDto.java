package com.smartexchange.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RatingDto {
    private Long id;
    private Long sessionId;
    private Long learnerId;
    private String learnerName;
    private Long mentorId;
    private String mentorName;
    private Integer rating;
    private String feedback;
    private LocalDateTime createdAt;
}
