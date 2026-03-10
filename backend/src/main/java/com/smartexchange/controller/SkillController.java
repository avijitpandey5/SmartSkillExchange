package com.smartexchange.controller;

import com.smartexchange.dto.SkillDto;
import com.smartexchange.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SkillController {

    private final SkillService skillService;

    @PostMapping
    public ResponseEntity<SkillDto> addSkill(@RequestBody SkillDto skillDto) {
        return ResponseEntity.ok(skillService.addSkill(skillDto));
    }

    @GetMapping
    public ResponseEntity<List<SkillDto>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }
}
