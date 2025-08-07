CREATE DATABASE IF NOT EXISTS scu_db;
USE scu_db;

-- game logic
CREATE TABLE IF NOT EXISTS age_division (
    age_division_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS member (
    member_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    display_name VARCHAR(50) NOT NULL UNIQUE,
    gender ENUM('m', 'w', 'd'),
    age_division_id INTEGER NOT NULL,
    overall_active BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (age_division_id) REFERENCES age_division(age_division_id)
);

CREATE TABLE IF NOT EXISTS doubles (
    doubles_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    player_a INTEGER NOT NULL,
    player_b INTEGER NOT NULL,
    FOREIGN KEY (player_a) REFERENCES member(member_id),
    FOREIGN KEY (player_b) REFERENCES member(member_id)
);

CREATE TABLE IF NOT EXISTS game_sets (
    set_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    points_a INTEGER NOT NULL,
    points_b INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS games_single (
    game_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    player_a INTEGER NOT NULL,
    player_b INTEGER NOT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    set_one INTEGER,
    set_two INTEGER,
    set_three INTEGER,
    winner_id INTEGER NOT NULL,
    valid BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (player_a) REFERENCES member(member_id),
    FOREIGN KEY (player_b) REFERENCES member(member_id),
    FOREIGN KEY (set_one) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_two) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_three) REFERENCES game_sets(set_id),
    FOREIGN KEY (winner_id) REFERENCES member(member_id)
);

CREATE TABLE IF NOT EXISTS games_double (
    game_id INTEGER NOT NULL PRIMARY KEY,
    doubles_id_a INTEGER NOT NULL,
    doubles_id_b INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    set_one INTEGER,
    set_two INTEGER,
    set_three INTEGER,
    winner_id INTEGER NOT NULL,
    valid BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (doubles_id_a) REFERENCES doubles(doubles_id),
    FOREIGN KEY (doubles_id_b) REFERENCES doubles(doubles_id),
    FOREIGN KEY (set_one) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_two) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_three) REFERENCES game_sets(set_id),
    FOREIGN KEY (winner_id) REFERENCES doubles(doubles_id)
);

-- user management
CREATE TABLE IF NOT EXISTS roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) UNIQUE NOT NULL,
    role_id INTEGER NOT NULL,
    tag VARCHAR(50),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE IF NOT EXISTS user_credentials (
    user_id INTEGER PRIMARY KEY,
    credential VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);