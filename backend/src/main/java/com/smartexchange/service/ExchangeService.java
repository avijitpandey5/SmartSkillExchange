package com.smartexchange.service;

import com.smartexchange.dto.ExchangeRequestDto;
import com.smartexchange.entity.ExchangeRequest;
import com.smartexchange.entity.Skill;
import com.smartexchange.entity.User;
import com.smartexchange.entity.enums.RequestStatus;
import com.smartexchange.repository.ExchangeRequestRepository;
import com.smartexchange.repository.SkillRepository;
import com.smartexchange.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExchangeService {

    private final ExchangeRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final WalletService walletService;

    public ExchangeRequestDto createRequest(Long learnerId, Long mentorId, Long skillId) {
        User learner = userRepository.findById(learnerId).orElseThrow(() -> new RuntimeException("Learner not found"));
        User mentor = userRepository.findById(mentorId).orElseThrow(() -> new RuntimeException("Mentor not found"));
        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> new RuntimeException("Skill not found"));

        if (learner.getCredits() < 2) {
            throw new RuntimeException("Not enough credits to request a session");
        }

        ExchangeRequest request = ExchangeRequest.builder()
                .learner(learner)
                .mentor(mentor)
                .skill(skill)
                .status(RequestStatus.PENDING)
                .build();

        return mapToDto(requestRepository.save(request));
    }

    public ExchangeRequestDto updateRequestStatus(Long requestId, RequestStatus newStatus) {
        ExchangeRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        
        request.setStatus(newStatus);
        
        if (newStatus == RequestStatus.ACCEPTED) {
            request.setSessionDate(LocalDateTime.now().plusDays(1)); // mock scheduling
        }

        return mapToDto(requestRepository.save(request));
    }

    @Transactional
    public ExchangeRequestDto completeSession(Long requestId) {
        ExchangeRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        
        if (request.getStatus() != RequestStatus.ACCEPTED) {
            throw new RuntimeException("Cannot complete a session that is not accepted");
        }

        // Deduct from learner, give to mentor
        walletService.transferCredits(
                request.getLearner().getId(),
                request.getMentor().getId(),
                2,
                "Session completed for skill: " + request.getSkill().getName()
        );

        request.setStatus(RequestStatus.COMPLETED);
        return mapToDto(requestRepository.save(request));
    }

    public List<ExchangeRequestDto> getLearnerRequests(Long learnerId) {
        return requestRepository.findByLearnerId(learnerId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<ExchangeRequestDto> getMentorRequests(Long mentorId) {
        return requestRepository.findByMentorId(mentorId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ExchangeRequestDto mapToDto(ExchangeRequest r) {
        return ExchangeRequestDto.builder()
                .id(r.getId())
                .learnerId(r.getLearner().getId())
                .learnerName(r.getLearner().getName())
                .mentorId(r.getMentor().getId())
                .mentorName(r.getMentor().getName())
                .skillId(r.getSkill().getId())
                .skillName(r.getSkill().getName())
                .status(r.getStatus())
                .sessionDate(r.getSessionDate())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
