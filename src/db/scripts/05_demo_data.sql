-- DEMO ENTRIES game logic
-- demo entries for member
INSERT INTO member (display_name, first_name, last_name, gender, age_division_id, overall_active) VALUES
('NetNinja', 'Alice', 'Smith', 'w', '[2]', TRUE),           -- 1
('SmashKing', 'Bob', 'Johnson', 'm', '[2]', TRUE),          -- 2
('CourtQueen', 'Carol', 'Williams', 'w', '[2]', TRUE),      -- 3
('AceMan', 'David', 'Brown', 'm', '[2]', TRUE),             -- 4
('DropShotDiva', 'Eve', 'Davis', 'w', '[2]', TRUE),         -- 5
('VolleyVic', 'Frank', 'Miller', 'm', '[2]', TRUE),         -- 6
('ServeStar', 'Grace', 'Wilson', 'w', '[2]', TRUE),         -- 7
('RacketRick', 'Henry', 'Moore', 'm', '[2]', TRUE),         -- 8
('ShuttleBelle', 'Ivy', 'Taylor', 'w', '[2]', TRUE),        -- 9
('LungeLeo', 'Jack', 'Anderson', 'm', '[2]', TRUE),         -- 10
('FeatherFighter', 'Karen', 'Thomas', 'w', '[1]', TRUE),    -- 11
('QuickQuinn', 'Liam', 'Jackson', 'm', '[1]', TRUE),        -- 12
('PowerPatty', 'Mia', 'White', 'w', '[1]', TRUE),           -- 13
('BounceBen', 'Noah', 'Harris', 'm', '[1]', TRUE),          -- 14
('SpinSophie', 'Olivia', 'Martin', 'w', '[3]', TRUE),       -- 15
('StrategySam', 'Paul', 'Garcia', 'm', '[3]', TRUE),        -- 16
('AgileAmy', 'Quinn', 'Martinez', 'w', '[3]', TRUE),        -- 17
('DynamicDan', 'Ryan', 'Robinson', 'm', '[3]', TRUE),       -- 18
('FleetFiona', 'Sara', 'Clark', 'w', '[2]', TRUE),          -- 19
('ZoneZack', 'Tom', 'Rodriguez', 'm', '[2]', TRUE);         -- 20

-- demo entries for doubles
INSERT INTO doubles (player_a, player_b) VALUES
(1, 3),   -- Alice (w) and Carol (w) [2]    -- 1
(2, 4),   -- Bob (m) and David (m) [2]      -- 2
(5, 7),   -- Eve (w) and Grace (w) [2]      -- 3
(6, 8),   -- Frank (m) and Henry (m) [2]    -- 4
(11, 12), -- Karen (w) and Liam (m) [1]     -- 5
(10, 13), -- Jack (m) and Mia (w) [1]       -- 6
(15, 16), -- Olivia (w) and Paul (m) [3]    -- 7
(17, 18), -- Quinn (w) and Ryan (m) [3]     -- 8
(9, 19),  -- Ivy (w) and Sara (w) [2]       -- 9
(19, 20); -- Sara (w) and Tom (m) [2]       -- 10

-- demo entries for single ranking
INSERT INTO pyramid_single (player_id, placement, timestamp, age_division_id) VALUES
(1, 1, '2025-09-24 00:00:00', 2),
(2, 2, '2025-09-24 00:00:00', 2),
(3, 3, '2025-09-24 00:00:00', 2),
(4, 4, '2025-09-24 00:00:00', 2),
(5, 5, '2025-09-24 00:00:00', 2),
(6, 6, '2025-09-24 00:00:00', 2),
(7, 7, '2025-09-24 00:00:00', 2),
(8, 8, '2025-09-24 00:00:00', 2),
(9, 9, '2025-09-24 00:00:00', 2),
(10, 10, '2025-09-24 00:00:00', 2),
(11, 1, '2025-09-24 00:00:00', 1),
(12, 2, '2025-09-24 00:00:00', 1),
(13, 3, '2025-09-24 00:00:00', 1),
(15, 1, '2025-09-24 00:00:00', 3),
(16, 2, '2025-09-24 00:00:00', 3),
(17, 3, '2025-09-24 00:00:00', 3);
-- 1: 14; 2: 19+20; 3: 18 are new players without placement

-- demo entries for games_single
INSERT INTO games_single (player_a, player_b, set_one, set_two, set_three, winner_id, valid) VALUES
-- 2 sets
(11, 12, '21-0', '21-1', NULL, 11, TRUE),       -- 1
(3, 4, '21-2', '21-3', NULL, 3, TRUE),          -- 2
(7, 8, '21-4', '21-5', NULL, 7, TRUE),          -- 3
(19, 20, '21-6', '21-7', NULL, 19, TRUE),       -- 4
(15, 16, '21-8', '21-9', NULL, 15, TRUE),       -- 5
(2, 4, '21-10', '21-11', NULL, 2, TRUE),        -- 6
(6, 8, '21-12', '21-13', NULL, 6, TRUE),        -- 7
-- 3 sets
(1, 2, '21-14', '15-21', '21-16', 1, TRUE),     -- 8
(5, 6, '21-17', '21-23', '21-19', 5, TRUE),     -- 9
(9, 10, '21-0', '21-23', '21-2', 9, TRUE),      -- 10
(13, 14, '21-3', '21-23', '21-5', 13, TRUE),    -- 11
(17, 18, '21-6', '21-23', '21-8', 17, TRUE),    -- 12
(1, 3, '21-9', '21-23', '21-11', 1, TRUE),      -- 13
(5, 7, '19-21', '21-13', '21-14', 5, TRUE),     -- 14
(9, 11, '17-21', '21-16', '21-17', 9, TRUE);    -- 15


-- demo entries for single ranking
INSERT INTO pyramid_double (player_id, placement, timestamp, age_division_id) VALUES
(1, 1, '2025-09-24 00:00:00', 2),
(2, 2, '2025-09-24 00:00:00', 2),
(3, 3, '2025-09-24 00:00:00', 2),
(4, 4, '2025-09-24 00:00:00', 2),
(5, 1, '2025-09-24 00:00:00', 1),
(6, 2, '2025-09-24 00:00:00', 1),
(7, 1, '2025-09-24 00:00:00', 3),
(8, 2, '2025-09-24 00:00:00', 3),
(9, 5, '2025-09-24 00:00:00', 2),
(10, 6, '2025-09-24 00:00:00', 2);

-- demo entries for games_double
INSERT INTO games_double (player_a, player_b, set_one, set_two, set_three, winner_id, valid) VALUES
-- 2 sets
(3, 4, '21-0', '21-1', NULL, 3, TRUE),      -- 1
(7, 8, '21-2', '21-3', NULL, 7, TRUE),      -- 2
(2, 3, '21-4', '21-5', NULL, 2, TRUE),      -- 3
(6, 7, '21-6', '21-7', NULL, 6, TRUE),      -- 4
(1, 3, '21-8', '21-9', NULL, 1, TRUE),      -- 5
(9, 2, '21-10', '21-11', NULL, 9, TRUE),    -- 6
(5, 7, '21-12', '21-13', NULL, 5, TRUE),    -- 7
-- 3 sets
(5, 6, '21-14', '21-23', '21-16', 5, TRUE), -- 8
(1, 2, '21-17', '21-23', '21-19', 1, TRUE), -- 9
(9, 1, '21-0', '21-23', '21-2', 9, TRUE),   -- 10
(4, 5, '21-3', '21-23', '21-5', 4, TRUE),   -- 11
(8, 9, '21-6', '21-23', '21-8', 8, TRUE),   -- 12
(2, 4, '21-9', '21-23', '21-11', 4, TRUE),  -- 13
(6, 8, '21-12', '21-23', '21-14', 6, TRUE), -- 14
(3, 5, '21-15', '21-23', '21-17', 3, TRUE); -- 15


-- DEMO ENTRIES user management

-- Dummy data for users
INSERT INTO users (first_name, last_name, username, role_id, tag) VALUES
('Admin', 'User', 'admin_user', 1, 'Main Admin'),   -- 1
('Player', 'One', 'player_one', 2, 'Newbie'),       -- 2
('Player', 'Two', 'player_two', 2, 'Veteran'),      -- 3
('Coach', 'User', 'coach_c', 2, 'Coach');           -- 4

-- Dummy data for user_credentials
INSERT INTO user_credentials (user_id, credential) VALUES
(1, 'secure_admin_pass'),   -- 1
(2, 'player1_pass'),        -- 2
(3, 'player2_pass'),        -- 3
(4, 'coach_pass');          -- 4