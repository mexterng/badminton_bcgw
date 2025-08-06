CREATE DATABASE IF NOT EXISTS scu_db;
USE scu_db;

CREATE TABLE IF NOT EXISTS age_division (
    age_division_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS member (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    display_name VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender VARCHAR(50) NOT NULL,
    age_division_id VARCHAR(100) NOT NULL UNIQUE,
    overall_active BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (age_division_id) REFERENCES age_division(age_division_id)
);
