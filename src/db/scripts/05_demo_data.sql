-- DEMO ENTRIES game logic
-- demo entries for member
INSERT INTO member (display_name, first_name, last_name, gender, age_division, overall_active) VALUES
('Anna M.',   'Anna',   'Müller',   'w', '[1]',     TRUE),      -- 1
('Björn B.',  'Björn',  'Becker',   'm', '[3]',     TRUE),      -- 2
('Carla S.',  'Carla',  'Schmidt',  'w', '[2,3]',   TRUE),      -- 3
('Dirk K.',   'Dirk',   'Klein',    'm', '[2]',     TRUE),      -- 4
('Eva H.',    'Eva',    'Hoff',     'w', '[3]',     TRUE),      -- 5
('Finn W.',   'Finn',   'Weber',    'm', '[2,3]',   TRUE),      -- 6
('Gina L.',   'Gina',   'Lehner',   'w', '[1]',     TRUE),      -- 7
('Hans F.',   'Hans',   'Faber',    'm', '[3]',     TRUE),      -- 8
('Iris B.',   'Iris',   'Brandt',   'w', '[2]',     TRUE),      -- 9
('Jan R.',    'Jan',    'Roth',     'm', '[3]',     TRUE),      -- 10
('Kuno S.',   'Kuno',   'Seidel',   'm', '[2,3]',   TRUE),      -- 11
('Leon V.',   'Leon',   'Vogel',    'm', '[3]',     TRUE),      -- 12
('Mara D.',   'Mara',   'Diehl',    'w', '[1]',     TRUE),      -- 13
('Nils T.',   'Nils',   'Thal',     'm', '[3]',     TRUE),      -- 14
('Otto G.',   'Otto',   'Graf',     'm', '[2,3]',   TRUE),      -- 15
('Paul F.',   'Paul',   'Friedl',   'm', '[1]',     TRUE),      -- 16
('Quin H.',   'Quin',   'Hartl',    'm', '[3]',     TRUE),      -- 17
('Rosa K.',   'Rosa',   'Kuhn',     'w', '[2,3]',   TRUE),      -- 18
('Sven J.',   'Sven',   'Jansen',   'm', '[3]',     TRUE),      -- 19
('Tina P.',   'Tina',   'Pohl',     'w', '[1]',     TRUE),      -- 20
('Uwe L.',    'Uwe',    'Lange',    'm', '[3]',     TRUE),      -- 21
('Vera Z.',   'Vera',   'Zimmer',   'w', '[2]',     TRUE),      -- 22
('Willi S.',  'Willi',  'Schorr',   'm', '[3]',     TRUE),      -- 23
('Xena M.',   'Xena',   'Metz',     'w', '[2,3]',   TRUE),      -- 24
('Yara B.',   'Yara',   'Berg',     'w', '[1]',     TRUE),      -- 25
('Zoe K.',    'Zoe',    'Kraft',    'w', '[3]',     TRUE);      -- 26

-- demo entries for doubles
INSERT INTO doubles (player_a, player_b) VALUES
-- Age Division 1
(1, 7),   -- 1 Anna M. & Gina L. #1
(13, 16), -- 2 Mara D. & Paul F. #2
(20, 25), -- 3 Tina P. & Yara B. #3
-- Age Division 2
(3, 4),   -- 3 Carla S. & Dirk K. #1
(6, 9),   -- 4 Finn W. & Iris B. #2
(11, 15), -- 5 Kuno S. & Otto G. #3
(18, 22), -- 6 Rosa K. & Vera Z. #4
(24, 6),  -- 7 Xena M. & Finn W. #5
-- Age Division 3
(2, 3),   -- 8 Björn B. & Carla S. #1
(5, 6),   -- 9 Eva H. & Finn W. #2
(8, 10),  -- 10 Hans F. & Jan R. #3
(11, 12), -- 11 Kuno S. & Leon V. #4
(14, 15), -- 12 Nils T. & Otto G. #5
(17, 18); -- 13 Quin H. & Rosa K. #6

-- demo entries for single ranking
INSERT INTO pyramid_single (player_id, placement, timestamp, age_division_id) VALUES
-- Age Division 1
(1, 1, '2025-02-14 12:00:00', 1),  -- Anna M.
(13, 2, '2025-02-14 12:00:00', 1),  -- Mara D.
(7, 3, '2025-02-14 12:00:00', 1),  -- Gina L.
(25, 4, '2025-02-14 12:00:00', 1),  -- Yara B.
(20, 5, '2025-02-14 12:00:00', 1),  -- Tina P.
(16, 6, '2025-02-14 12:00:00', 1),  -- Paul F.
-- Age Division 2
(3, 1, '2025-04-15 12:00:00', 2),  -- Carla S.
(9, 2, '2025-04-15 12:00:00', 2),  -- Iris B.
(6, 3, '2025-04-15 12:00:00', 2),  -- Finn W.
(4, 4, '2025-04-15 12:00:00', 2),  -- Dirk K.
(15, 5, '2025-04-15 12:00:00', 2),  -- Otto G.
(11, 6, '2025-04-15 12:00:00', 2),  -- Kuno S.
(22, 7, '2025-04-15 12:00:00', 2),  -- Vera Z.
(18, 8, '2025-04-15 12:00:00', 2),  -- Rosa K.
(24, 9, '2025-04-15 12:00:00', 2),  -- Xena M.
-- Age Division 3
(3, 1, '2025-07-24 12:00:00', 3),  -- Carla S.
(2, 2, '2025-07-24 12:00:00', 3),  -- Björn B.
(8, 3, '2025-07-24 12:00:00', 3),  -- Hans F.
(6, 4, '2025-07-24 12:00:00', 3),  -- Finn W.
(5, 5, '2025-07-24 12:00:00', 3),  -- Eva H.
(10, 6, '2025-07-24 12:00:00', 3),  -- Jan R.
(12, 7, '2025-07-24 12:00:00', 3),  -- Leon V.
(11, 8, '2025-07-24 12:00:00', 3),  -- Kuno S.
(15, 9, '2025-07-24 12:00:00', 3),  -- Otto G.
(14, 10, '2025-07-24 12:00:00', 3),  -- Nils T.
(18, 11, '2025-07-24 12:00:00', 3),  -- Rosa K.
(17, 12, '2025-07-24 12:00:00', 3),  -- Quin H.
(21, 13, '2025-07-24 12:00:00', 3),  -- Uwe L.
(19, 14, '2025-07-24 12:00:00', 3),  -- Sven J.
(24, 15, '2025-07-24 12:00:00', 3),  -- Xena M.
(23, 16, '2025-07-24 12:00:00', 3),  -- Willi S.
(26, 17, '2025-07-24 12:00:00', 3);  -- Zoe K.

-- demo entries for games_single
INSERT INTO games_single (timestamp, age_division_id, player_a, player_b, set_one, set_two, set_three, winner_id, valid) VALUES

-- Age Division 1
('2025-01-05 12:00:00', 1, 1, 7, '21-11', '21-10', NULL, 1, TRUE),  -- Anna M. vs Gina L.
('2025-01-15 12:00:00', 1, 13, 16, '10-21', '14-21', NULL, 13, TRUE),  -- Mara D. vs Paul F.
('2025-01-25 12:00:00', 1, 7, 13, '16-21', '13-21', NULL, 7, TRUE),  -- Gina L. vs Mara D.
('2025-02-04 12:00:00', 1, 16, 20, '21-20', '17-21', '21-11', 20, TRUE),  -- Paul F. vs Tina P.
('2025-02-14 12:00:00', 1, 20, 25, '20-21', '21-13', '21-19', 20, FALSE),  -- Tina P. vs Yara B. (invalid)
-- Age Division 2
('2025-01-05 12:00:00', 1, 1, 7, '21-11', '21-10', NULL, 1, TRUE),  -- Anna M. vs Gina L.
('2025-01-15 12:00:00', 1, 13, 16, '10-21', '14-21', NULL, 13, TRUE),  -- Mara D. vs Paul F.
('2025-01-25 12:00:00', 1, 7, 13, '16-21', '13-21', NULL, 7, TRUE),  -- Gina L. vs Mara D.
('2025-02-04 12:00:00', 1, 16, 20, '21-20', '17-21', '21-11', 20, TRUE),  -- Paul F. vs Tina P.
('2025-02-15 12:00:00', 1, 20, 25, '20-21', '21-13', '21-19', 20, FALSE),  -- Tina P. vs Yara B. (invalid)
-- Age Division 3
('2025-04-25 12:00:00', 3, 2, 3, '20-21', '21-13', '21-20', 3, TRUE),  -- Björn B. vs Carla S.
('2025-05-05 12:00:00', 3, 5, 6, '19-21', '21-19', '21-16', 6, TRUE),  -- Eva H. vs Finn W.
('2025-05-15 12:00:00', 3, 8, 10, '10-21', '10-21', NULL, 8, TRUE),  -- Hans F. vs Jan R.
('2025-05-25 12:00:00', 3, 11, 12, '11-21', '12-21', NULL, 12, TRUE),  -- Kuno S. vs Leon V.
('2025-06-04 12:00:00', 3, 14, 15, '16-21', '13-21', NULL, 14, TRUE),  -- Nils T. vs Otto G.
('2025-06-14 12:00:00', 3, 17, 18, '21-10', '10-21', '21-15', 18, TRUE),  -- Quin H. vs Rosa K.
('2025-06-24 12:00:00', 3, 19, 21, '10-21', '17-21', NULL, 19, TRUE),  -- Sven J. vs Uwe L.
('2025-07-04 12:00:00', 3, 23, 24, '18-21', '21-12', '21-20', 23, TRUE),  -- Willi S. vs Xena M.
('2025-07-14 12:00:00', 3, 6, 8, '16-21', '16-21', NULL, 6, TRUE),  -- Finn W. vs Hans F.
('2025-07-24 12:00:00', 3, 12, 26, '21-14', '21-11', NULL, 12, FALSE);  -- Leon V. vs Zoe K. (invalid)


-- demo entries for single ranking
INSERT INTO pyramid_double (player_id, placement, timestamp, age_division_id) VALUES
-- Age Division 1
(3, 1, '2025-01-25 12:00:00', 1),  -- Tina P. & Yara B.
(2, 2, '2025-01-25 12:00:00', 1),  -- Mara D. & Paul F.
(1, 3, '2025-01-25 12:00:00', 1),  -- Anna M. & Gina L.
-- Age Division 2
(8, 1, '2025-03-06 12:00:00', 2),  -- Xena M. & Finn W.
(4, 2, '2025-03-06 12:00:00', 2),  -- Carla S. & Dirk K.
(7, 3, '2025-03-06 12:00:00', 2),  -- Rosa K. & Vera Z.
(6, 4, '2025-03-06 12:00:00', 2),  -- Kuno S. & Otto G.
(5, 5, '2025-03-06 12:00:00', 2),  -- Finn W. & Iris B.
-- Age Division 3
(11, 1, '2025-05-25 12:00:00', 3),  -- Hans F. & Jan R.
(9, 2, '2025-05-25 12:00:00', 3),  -- Björn B. & Carla S.
(14, 3, '2025-05-25 12:00:00', 3),  -- Quin H. & Rosa K.
(12, 4, '2025-05-25 12:00:00', 3),  -- Kuno S. & Leon V.
(13, 5, '2025-05-25 12:00:00', 3),  -- Nils T. & Otto G.
(10, 6, '2025-05-25 12:00:00', 3);  -- Eva H. & Finn W.

-- demo entries for games_double
INSERT INTO games_double (timestamp, age_division_id, player_a, player_b, set_one, set_two, set_three, winner_id, valid) VALUES
-- Age Division 1
('2025-01-05 12:00:00', 1, 1, 2, '13-21', '17-21', NULL, 2, TRUE),  -- Anna M. & Gina L. vs Mara D. & Paul F.
('2025-01-15 12:00:00', 1, 1, 3, '12-21', '20-21', NULL, 3, TRUE),  -- Anna M. & Gina L. vs Tina P. & Yara B.
('2025-01-25 12:00:00', 1, 2, 3, '21-18', '21-18', NULL, 2, TRUE),  -- Mara D. & Paul F. vs Tina P. & Yara B.
-- Age Division 2
('2025-02-04 12:00:00', 2, 4, 5, '19-21', '17-21', NULL, 5, TRUE),  -- Carla S. & Dirk K. vs Finn W. & Iris B.
('2025-02-14 12:00:00', 2, 6, 7, '21-19', '21-13', NULL, 7, TRUE),  -- Kuno S. & Otto G. vs Rosa K. & Vera Z.
('2025-02-24 12:00:00', 2, 5, 8, '12-21', '21-15', '21-18', 5, TRUE),  -- Finn W. & Iris B. vs Xena M. & Finn W.
('2025-03-06 12:00:00', 2, 4, 8, '15-21', '21-12', '21-16', 8, TRUE),  -- Carla S. & Dirk K. vs Xena M. & Finn W.
-- Age Division 3
('2025-03-16 12:00:00', 3, 9, 10, '21-19', '21-14', NULL, 10, TRUE),  -- Björn B. & Carla S. vs Eva H. & Finn W.
('2025-03-26 12:00:00', 3, 11, 12, '21-13', '21-15', NULL, 11, TRUE),  -- Hans F. & Jan R. vs Kuno S. & Leon V.
('2025-04-05 12:00:00', 3, 13, 14, '21-17', '21-13', NULL, 14, TRUE),  -- Nils T. & Otto G. vs Quin H. & Rosa K.
('2025-04-15 12:00:00', 3, 9, 11, '19-21', '17-21', NULL, 11, TRUE),  -- Björn B. & Carla S. vs Hans F. & Jan R.
('2025-04-25 12:00:00', 3, 10, 12, '11-21', '10-21', NULL, 10, TRUE),  -- Eva H. & Finn W. vs Kuno S. & Leon V.
('2025-05-05 12:00:00', 3, 13, 9, '17-21', '21-10', '21-10', 13, FALSE),  -- Nils T. & Otto G. vs Björn B. & Carla S.
('2025-05-15 12:00:00', 3, 14, 12, '13-21', '21-10', '21-18', 12, TRUE),  -- Quin H. & Rosa K. vs Kuno S. & Leon V.
('2025-05-25 12:00:00', 3, 10, 13, '15-21', '21-16', '21-15', 10, TRUE);  -- Eva H. & Finn W. vs Nils T. & Otto G.


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