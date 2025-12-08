CREATE DATABASE IF NOT EXISTS scu_db;
USE scu_db;

-- game logic
CREATE TABLE IF NOT EXISTS age_division (
    age_division_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS member (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    display_name VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender ENUM('m', 'w', 'd'),
    age_division JSON NOT NULL,
    overall_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS doubles (
    doubles_id INT AUTO_INCREMENT PRIMARY KEY,
    player_a INT NOT NULL,
    player_b INT NOT NULL,
    overall_active BOOLEAN DEFAULT FALSE, -- before insertion, check if both players are active
    FOREIGN KEY (player_a) REFERENCES member(member_id),
    FOREIGN KEY (player_b) REFERENCES member(member_id)
);

CREATE TABLE IF NOT EXISTS game_sets (
    set_id varchar(5) PRIMARY KEY,
    points_a INT NOT NULL,
    points_b INT NOT NULL,
    CHECK (points_a <= 30 AND points_b <= 30)
);

CREATE TABLE IF NOT EXISTS games_single (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    player_a INT NOT NULL,
    player_b INT NOT NULL,
    age_division_id INT DEFAULT 2, -- default erstmal auf erwachseen gesetzt muss später mittels funktion oder set des users gestzt werden
    timestamp TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    set_one varchar(5) NOT NULL,
    set_two varchar(5) NOT NULL,
    set_three varchar(5),
    winner_id INT NOT NULL,
    valid BOOLEAN DEFAULT FALSE, -- to be set true when both players are marked as active
    FOREIGN KEY (player_a) REFERENCES member(member_id),
    FOREIGN KEY (player_b) REFERENCES member(member_id),
    FOREIGN KEY (age_division_id) REFERENCES age_division(age_division_id),
    FOREIGN KEY (winner_id) REFERENCES member(member_id),
    FOREIGN KEY (set_one) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_two) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_three) REFERENCES game_sets(set_id),
    CHECK (player_a != player_b)
);

CREATE TABLE IF NOT EXISTS games_double (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    player_a INT NOT NULL,
    player_b INT NOT NULL,
    age_division_id INT NOT NULL DEFAULT 2,
    timestamp TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    set_one varchar(5) NOT NULL,
    set_two varchar(5) NOT NULL,
    set_three varchar(5),
    winner_id INT NOT NULL,
    valid BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (player_a) REFERENCES doubles(doubles_id),
    FOREIGN KEY (player_b) REFERENCES doubles(doubles_id),
    FOREIGN KEY (age_division_id) REFERENCES age_division(age_division_id),
    FOREIGN KEY (winner_id) REFERENCES doubles(doubles_id),
    FOREIGN KEY (set_one) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_two) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_three) REFERENCES game_sets(set_id),
    CHECK (player_a != player_b)
);

CREATE TABLE IF NOT EXISTS pyramid_single (
    player_id INT NOT NULL,
    placement INT NOT NULL,
    timestamp TIMESTAMP  NOT NULL,
    age_division_id INT NOT NULL,
    PRIMARY KEY (player_id, timestamp, age_division_id), -- timestamp needs to be set when pyramid is newly calculated and then we should agree on a hour / 10 / 5 / 1 minute group or simular
    FOREIGN KEY (player_id) REFERENCES member(member_id),
    FOREIGN KEY (age_division_id) REFERENCES age_division(age_division_id) 
);

CREATE TABLE IF NOT EXISTS pyramid_double (
    player_id INT NOT NULL,
    placement INT NOT NULL,
    timestamp TIMESTAMP  NOT NULL,
    age_division_id INT NOT NULL,
    PRIMARY KEY (player_id, timestamp, age_division_id),
    FOREIGN KEY (player_id) REFERENCES doubles(doubles_id),
    FOREIGN KEY (age_division_id) REFERENCES age_division(age_division_id) 
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