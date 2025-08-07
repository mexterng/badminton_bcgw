-- game logic
CREATE TABLE age_division (
    age_division_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE member (
    member_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    display_name VARCHAR(255) NOT NULL,
    gender ENUM('m', 'w', 'd'),
    age_division_id INTEGER NOT NULL,
    overall_active BOOLEAN NOT NULL,
    FOREIGN KEY (age_division_id) REFERENCES age_division(age_division_id)
);

CREATE TABLE doubles (
    doubles_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    player_a INTEGER NOT NULL,
    player_b INTEGER NOT NULL,
    FOREIGN KEY (player_a) REFERENCES member(member_id),
    FOREIGN KEY (player_b) REFERENCES member(member_id)
);

CREATE TABLE game_sets (
    set_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    points_a INTEGER NOT NULL,
    points_b INTEGER NOT NULL
);

CREATE TABLE games_single (
    game_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    player_a INTEGER NOT NULL,
    player_b INTEGER NOT NULL,
    timestamp DATETIME NOT NULL,
    set_one INTEGER,
    set_two INTEGER,
    set_three INTEGER,
    winner_id INTEGER NOT NULL,
    valid BOOLEAN NOT NULL,
    FOREIGN KEY (player_a) REFERENCES member(member_id),
    FOREIGN KEY (player_b) REFERENCES member(member_id),
    FOREIGN KEY (set_one) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_two) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_three) REFERENCES game_sets(set_id),
    FOREIGN KEY (winner_id) REFERENCES member(member_id)
);

CREATE TABLE games_double (
    game_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    doubles_id_a INTEGER NOT NULL,
    doubles_id_b INTEGER NOT NULL,
    timestamp DATETIME NOT NULL,
    set_one INTEGER,
    set_two INTEGER,
    set_three INTEGER,
    winner_id INTEGER NOT NULL,
    valid BOOLEAN NOT NULL,
    FOREIGN KEY (doubles_id_a) REFERENCES doubles(doubles_id),
    FOREIGN KEY (doubles_id_b) REFERENCES doubles(doubles_id),
    FOREIGN KEY (set_one) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_two) REFERENCES game_sets(set_id),
    FOREIGN KEY (set_three) REFERENCES game_sets(set_id),
    FOREIGN KEY (winner_id) REFERENCES doubles(doubles_id)
);

-- user management
CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE users (
    user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255) UNIQUE NOT NULL,
    role_id INTEGER NOT NULL,
    tag VARCHAR(255),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE user_credentials (
    user_id INTEGER PRIMARY KEY,
    credential VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);