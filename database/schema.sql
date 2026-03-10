-- Smart Skill Exchange Platform - Database Schema
-- Run this script in your MySQL interface

CREATE DATABASE IF NOT EXISTS smart_skill_exchange;
USE smart_skill_exchange;

CREATE TABLE Users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL COMMENT 'ROLE_ADMIN, ROLE_MENTOR, ROLE_LEARNER, ROLE_HR',
    credits INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserSkillsTeach (
    user_id BIGINT,
    skill_id BIGINT,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(id) ON DELETE CASCADE
);

CREATE TABLE UserSkillsLearn (
    user_id BIGINT,
    skill_id BIGINT,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(id) ON DELETE CASCADE
);

CREATE TABLE ExchangeRequests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    learner_id BIGINT,
    mentor_id BIGINT,
    skill_id BIGINT,
    status VARCHAR(50) DEFAULT 'PENDING' COMMENT 'PENDING, ACCEPTED, REJECTED, COMPLETED',
    session_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (learner_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(id) ON DELETE CASCADE
);

CREATE TABLE CreditTransactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NULL COMMENT 'NULL represents System/Admin',
    receiver_id BIGINT NULL,
    amount INT NOT NULL,
    reason VARCHAR(255),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(id) ON DELETE SET NULL,
    FOREIGN KEY (receiver_id) REFERENCES Users(id) ON DELETE SET NULL
);

CREATE TABLE Ratings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT,
    learner_id BIGINT,
    mentor_id BIGINT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES ExchangeRequests(id) ON DELETE CASCADE,
    FOREIGN KEY (learner_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE ChatMessages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT,
    receiver_id BIGINT,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE AdminLogs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_id BIGINT,
    action VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES Users(id) ON DELETE CASCADE
);
