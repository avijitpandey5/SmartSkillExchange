package com.smartexchange.service;

import com.smartexchange.dto.CreditTransactionDto;
import com.smartexchange.entity.CreditTransaction;
import com.smartexchange.entity.User;
import com.smartexchange.repository.CreditTransactionRepository;
import com.smartexchange.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final CreditTransactionRepository transactionRepository;
    private final UserRepository userRepository;

    @Transactional
    public void transferCredits(Long senderId, Long receiverId, Integer amount, String reason) {
        User sender = null;
        if (senderId != null) {
            sender = userRepository.findById(senderId)
                    .orElseThrow(() -> new RuntimeException("Sender not found"));
            if (sender.getCredits() < amount) {
                throw new RuntimeException("Insufficient credits");
            }
            sender.setCredits(sender.getCredits() - amount);
            userRepository.save(sender);
        }

        User receiver = null;
        if (receiverId != null) {
            receiver = userRepository.findById(receiverId)
                    .orElseThrow(() -> new RuntimeException("Receiver not found"));
            receiver.setCredits(receiver.getCredits() + amount);
            userRepository.save(receiver);
        }

        CreditTransaction transaction = CreditTransaction.builder()
                .sender(sender)
                .receiver(receiver)
                .amount(amount)
                .reason(reason)
                .build();
        transactionRepository.save(transaction);
    }

    public List<CreditTransactionDto> getUserTransactions(Long userId) {
        List<CreditTransaction> sent = transactionRepository.findBySenderId(userId);
        List<CreditTransaction> received = transactionRepository.findByReceiverId(userId);

        sent.addAll(received);
        
        return sent.stream()
                .sorted((t1, t2) -> t2.getTransactionDate().compareTo(t1.getTransactionDate()))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private CreditTransactionDto mapToDto(CreditTransaction t) {
        return CreditTransactionDto.builder()
                .id(t.getId())
                .senderId(t.getSender() != null ? t.getSender().getId() : null)
                .senderName(t.getSender() != null ? t.getSender().getName() : "System")
                .receiverId(t.getReceiver() != null ? t.getReceiver().getId() : null)
                .receiverName(t.getReceiver() != null ? t.getReceiver().getName() : "System")
                .amount(t.getAmount())
                .reason(t.getReason())
                .transactionDate(t.getTransactionDate())
                .build();
    }
}
