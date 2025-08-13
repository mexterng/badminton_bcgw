-- DEMO ENTRIES game logic
-- demo entries for member
INSERT INTO member (display_name, first_name, last_name, gender, age_division_id, overall_active) VALUES
('NetNinja', 'Alice', 'Smith', 'w', 2, TRUE),
('SmashKing', 'Bob', 'Johnson', 'm', 2, TRUE),
('CourtQueen', 'Carol', 'Williams', 'w', 2, TRUE),
('AceMan', 'David', 'Brown', 'm', 2, TRUE),
('DropShotDiva', 'Eve', 'Davis', 'w', 2, TRUE),
('VolleyVic', 'Frank', 'Miller', 'm', 2, TRUE),
('ServeStar', 'Grace', 'Wilson', 'w', 2, TRUE),
('RacketRick', 'Henry', 'Moore', 'm', 2, TRUE),
('ShuttleBelle', 'Ivy', 'Taylor', 'w', 2, TRUE),
('LungeLeo', 'Jack', 'Anderson', 'm', 2, TRUE),
('FeatherFighter', 'Karen', 'Thomas', 'w', 1, TRUE),
('QuickQuinn', 'Liam', 'Jackson', 'm', 1, TRUE),
('PowerPatty', 'Mia', 'White', 'w', 1, TRUE),
('BounceBen', 'Noah', 'Harris', 'm', 1, TRUE),
('SpinSophie', 'Olivia', 'Martin', 'w', 3, TRUE),
('StrategySam', 'Paul', 'Garcia', 'm', 3, TRUE),
('AgileAmy', 'Quinn', 'Martinez', 'w', 3, TRUE),
('DynamicDan', 'Ryan', 'Robinson', 'm', 3, TRUE),
('FleetFiona', 'Sara', 'Clark', 'w', 2, TRUE),
('ZoneZack', 'Tom', 'Rodriguez', 'm', 2, TRUE);

-- demo entries for doubles
INSERT INTO doubles (player_a, player_b) VALUES
(1, 3),   -- Alice (w) and Carol (w)
(2, 4),   -- Bob (m) and David (m)
(5, 7),   -- Eve (w) and Grace (w)
(6, 8),   -- Frank (m) and Henry (m)
(9, 11),  -- Ivy (w) and Karen (w)
(10, 12), -- Jack (m) and Liam (m)
(13, 15), -- Mia (w) and Olivia (w)
(14, 16), -- Noah (m) and Paul (m)
(17, 19), -- Quinn (w) and Sara (w)
(18, 20); -- Ryan (m) and Tom (m)

-- demo entries for game_sets
INSERT INTO game_sets (points_a, points_b) VALUES
(21, 15), -- Set 1
(15, 21), -- Set 2
(21, 19), -- Set 3
(15, 21), -- Set 4
(21, 17), -- Set 5
(18, 21), -- Set 6
(21, 16), -- Set 7
(17, 21), -- Set 8
(21, 18), -- Set 9
(19, 21), -- Set 10
(21, 14), -- Set 11
(14, 21), -- Set 12
(21, 20), -- Set 13
(20, 21), -- Set 14
(21, 10), -- Set 15
(10, 21), -- Set 16
(21, 13), -- Set 17
(13, 21), -- Set 18
(21, 25), -- Set 19 (points > 21 for example, but within 30)
(25, 21), -- Set 20
(30, 28), -- Set 21 (max points example)
(28, 30); -- Set 22

-- demo entries for games_single
INSERT INTO games_single (player_a, player_b, set_one, set_two, set_three, winner_id, valid) VALUES
-- 2 sets
(11, 12, 14, 15, NULL, 12, TRUE),
(3, 4, 4, 5, NULL, 4, TRUE),
(7, 8, 9, 10, NULL, 7, TRUE),
(19, 20, 2, 3, NULL, 20, TRUE),
(15, 16, 19, 20, NULL, 16, TRUE),
(2, 4, 7, 8, NULL, 4, TRUE),
(6, 8, 12, 13, NULL, 8, TRUE),
-- 3 sets
(1, 2, 1, 2, 3, 1, TRUE),
(5, 6, 6, 7, 8, 5, TRUE),
(9, 10, 11, 12, 13, 9, TRUE),
(13, 14, 16, 17, 18, 13, TRUE),
(17, 18, 21, 22, 1, 17, TRUE),
(1, 3, 4, 5, 6, 1, TRUE),
(5, 7, 9, 10, 11, 5, TRUE),
(9, 11, 14, 15, 16, 9, TRUE);

-- demo entries for games_double
INSERT INTO games_double (doubles_id_a, doubles_id_b, set_one, set_two, set_three, winner_id, valid) VALUES
-- 2 sets
(3, 4, 4, 5, NULL, 4, TRUE),
(7, 8, 9, 10, NULL, 7, TRUE),
(2, 3, 14, 15, NULL, 2, TRUE),
(6, 7, 19, 20, NULL, 6, TRUE),
(1, 3, 2, 3, NULL, 1, TRUE),
(9, 2, 12, 13, NULL, 9, TRUE),
(5, 7, 7, 8, NULL, 5, TRUE),
-- 3 sets
(5, 6, 6, 7, 8, 5, TRUE),
(1, 2, 1, 2, 3, 1, TRUE),
(9, 1, 11, 12, 13, 9, TRUE), 
(4, 5, 16, 17, 18, 4, TRUE),
(8, 9, 21, 22, 1, 8, TRUE),
(2, 4, 4, 5, 6, 4, TRUE),
(6, 8, 9, 10, 11, 6, TRUE),
(3, 5, 14, 15, 16, 3, TRUE);


-- DEMO ENTRIES user management

-- Dummy data for users
INSERT INTO users (first_name, last_name, username, role_id, tag) VALUES
('Admin', 'User', 'admin_user', 1, 'Main Admin'),
('Player', 'One', 'player_one', 2, 'Newbie'),
('Player', 'Two', 'player_two', 2, 'Veteran'),
('Coach', 'User', 'coach_c', 2, 'Coach');

-- Dummy data for user_credentials
INSERT INTO user_credentials (user_id, credential) VALUES
(1, 'secure_admin_pass'),
(2, 'player1_pass'),
(3, 'player2_pass'),
(4, 'coach_pass');