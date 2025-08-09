-- DEMO ENTRIES game logic
-- demo entries for member
INSERT INTO member (first_name, last_name, display_name, gender, age_division_id, overall_active) VALUES
('Anton', 'Arnold', 'A', 'm', 2, TRUE),    -- member_id=1, Jugendliche
('Barbara', 'Böhm', 'B', 'w', 2, FALSE),   -- member_id=2, Jugendliche
('Carla', 'Conrad', 'C', 'w', 3, TRUE),    -- member_id=3, Erwachsene
('Dieter', 'Dorn', 'D', 'm', 3, TRUE),     -- member_id=4, Erwachsene
('Eva', 'Engel', 'E', 'w', 1, FALSE),      -- member_id=5, Schüler
('Frank', 'Fischer', 'F', 'm', 1, FALSE),  -- member_id=6, Schüler
('Gisela', 'Gruber', 'G', 'w', 3, TRUE),   -- member_id=7, Erwachsene
('Heinz', 'Hoffmann', 'H', 'm', 2, TRUE),  -- member_id=8, Jugendliche
('Ina', 'Igel', 'I', 'w', 3, TRUE),        -- member_id=9, Erwachsene
('Jan', 'Jäger', 'J', 'm', 2, TRUE);       -- member_id=10, Jugendliche

-- demo entries for doubles
INSERT INTO doubles (player_a, player_b) VALUES
(1, 2),  -- doubles_id=1, players: A & B
(3, 4),  -- doubles_id=2, players: C & D
(5, 6),  -- doubles_id=3, players: E & F
(7, 8),  -- doubles_id=4, players: G & H
(7, 9),  -- doubles_id=5, players: G & I
(8, 9),  -- doubles_id=6, players: H & I
(9, 10); -- doubles_id=7, players: I & J

-- demo entries for game_sets
INSERT INTO game_sets (points_a, points_b) VALUES
(21, 0),   -- set_id=1: Sieg A
(21, 1),   -- set_id=2: Sieg A
(21, 10),  -- set_id=3: Sieg A
(22, 20),  -- set_id=4: Sieg A, Verlängerung
(30, 29),  -- set_id=5: Sieg A, Verlängerung Ende
(0, 21),   -- set_id=6: Sieg B
(1, 21),   -- set_id=7: Sieg B
(10, 21),  -- set_id=8: Sieg B
(20, 22),  -- set_id=9: Sieg B, Verlängerung
(29, 30);  -- set_id=10: Sieg B, Verlängerung Ende

-- demo entries for games_single
INSERT INTO games_single (player_a, player_b, timestamp, set_one, set_two, set_three, winner_id, valid) VALUES
-- 2-Set-Games
(1, 3, '2025-08-01 10:00:00', 1, 2, NULL, 1, TRUE),  -- 2:0 Sieg A
(4, 2, '2025-08-01 11:00:00', 6, 7, NULL, 2, TRUE),  -- 0:2 Sieg B
(7, 8, '2025-08-02 11:00:00', 9, 10, NULL, 8, TRUE), -- 0:2 Sieg B
(9, 10, '2025-08-03 09:00:00', 1, 3, NULL, 9, TRUE), -- 2:0 Sieg A
(3, 6, '2025-08-05 10:30:00', 1, 3, NULL, 3, TRUE),  -- 2:0 Sieg A
(8, 9, '2025-08-06 09:00:00', 1, 2, NULL, 8, TRUE),  -- 2:0 Sieg A
(7, 1, '2025-08-05 11:00:00', 6, 7, NULL, 1, TRUE),  -- 2:0 Sieg A
-- 3-Set-Games
(5, 6, '2025-08-02 10:30:00', 4, 7, 8, 6, TRUE),     -- 1:2 Sieg B
(1, 4, '2025-08-04 10:00:00', 1, 7, 3, 1, TRUE),     -- 2:1 Sieg A
(2, 5, '2025-08-04 11:00:00', 6, 2, 8, 5, TRUE);     -- 1:2 Sieg B

-- demo entries for games_double
INSERT INTO games_double (doubles_id_a, doubles_id_b, timestamp, set_one, set_two, set_three, winner_id, valid) VALUES
-- 2-Set-Games
(1, 2, '2025-08-06 10:00:00', 1, 2, NULL, 1, TRUE),   -- 2:0 Sieg Doppel 1
(3, 4, '2025-08-06 11:00:00', 6, 7, NULL, 4, TRUE),   -- 0:2 Sieg Doppel 4
(2, 3, '2025-08-07 11:00:00', 1, 3, NULL, 3, TRUE),   -- 2:0 Sieg Doppel 3
(7, 2, '2025-08-09 09:00:00', 1, 3, NULL, 5, TRUE),   -- 2:0 Sieg Doppel 5
(1, 3, '2025-08-08 09:00:00', 1, 2, NULL, 1, TRUE),   -- 2:0 Sieg Doppel 1
(3, 1, '2025-08-09 10:00:00', 1, 2, NULL, 3, TRUE),   -- 2:0 Sieg Doppel 3
(4, 5, '2025-08-08 10:00:00', 6, 7, NULL, 5, TRUE),   -- 0:2 Sieg Doppel 5
-- 3-Set-Games
(5, 6, '2025-08-07 09:00:00', 4, 7, 8, 6, TRUE),      -- 1:2 Sieg Doppel 6
(6, 7, '2025-08-08 11:00:00', 1, 7, 3, 6, TRUE),      -- 2:1 Sieg Doppel 6
(7, 1, '2025-08-07 10:30:00', 1, 3, 4, 4, TRUE);      -- 2:1 Sieg Doppel 4


-- DEMO ENTRIES user management
-- demo entries for roles
INSERT INTO roles (description) VALUES
('demo');       -- role_id=3

-- demo entries for users
INSERT INTO users (first_name, last_name, username, role_id, tag) VALUES
('Demo', 'User', 'demo', 3, 'demo-tag');  -- user_id=1

-- demo entries for user_credentials
INSERT INTO user_credentials (user_id, credential) VALUES
(1, 'demo_password_hash');  -- user_id=1