package com.smartexchange.service;

import com.smartexchange.dto.SkillDto;
import com.smartexchange.entity.Skill;
import com.smartexchange.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillDto addSkill(SkillDto skillDto) {
        if (skillRepository.findByName(skillDto.getName()).isPresent()) {
            throw new RuntimeException("Skill already exists");
        }
        Skill skill = Skill.builder()
                .name(skillDto.getName())
                .category(skillDto.getCategory())
                .build();
        skill = skillRepository.save(skill);
        
        skillDto.setId(skill.getId());
        return skillDto;
    }

    public List<SkillDto> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(s -> new SkillDto(s.getId(), s.getName(), s.getCategory()))
                .collect(Collectors.toList());
    }
}
