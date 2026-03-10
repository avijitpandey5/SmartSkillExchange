package com.smartexchange.dto;

import com.smartexchange.entity.enums.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeRequestDto {
    private Long id;
    private Long learnerId;
    private String learnerName;
    private Long mentorId;
    private String mentorName;
    private Long skillId;
    private String skillName;
    private RequestStatus status;
    private LocalDateTime sessionDate;
    private LocalDateTime createdAt;
}
