package com.smartexchange.controller;

import com.smartexchange.dto.CreditTransactionDto;
import com.smartexchange.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CreditTransactionController {

    private final WalletService walletService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CreditTransactionDto>> getUserTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(walletService.getUserTransactions(userId));
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transferCredits(
            @RequestParam(required = false) Long senderId,
            @RequestParam(required = false) Long receiverId,
            @RequestParam Integer amount,
            @RequestParam String reason) {
        walletService.transferCredits(senderId, receiverId, amount, reason);
        return ResponseEntity.ok().build();
    }
}
