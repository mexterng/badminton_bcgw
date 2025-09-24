DROP PROCEDURE IF EXISTS get_single_ranking;
DROP PROCEDURE IF EXISTS get_double_ranking;
-- For each member/team the won points and lost points is summed up as well as the number of won games.
DELIMITER $$

-- single ranking procedure
CREATE PROCEDURE get_single_ranking()
BEGIN
    WITH stats AS (
        SELECT
            m.member_id,
            m.display_name,
            SUM(CASE WHEN m.member_id = gs.player_a THEN s.points_a
                     WHEN m.member_id = gs.player_b THEN s.points_b
                END) AS won_points,
            SUM(CASE WHEN m.member_id = gs.player_a THEN s.points_b
                     WHEN m.member_id = gs.player_b THEN s.points_a
                END) AS lost_points,
            (
                SELECT COUNT(*)
                FROM games_single gsw
                WHERE gsw.winner_id = m.member_id AND gsw.valid = TRUE
            ) AS won_games
        FROM member m
        JOIN games_single gs
            ON m.member_id = gs.player_a OR m.member_id = gs.player_b
        JOIN game_sets s
            ON s.set_id IN (gs.set_one, gs.set_two, gs.set_three)
		WHERE m.overall_active = TRUE AND gsw.valid = TRUE
        GROUP BY m.member_id, m.display_name
    )
    SELECT
        *,
        RANK() OVER (
            ORDER BY won_games DESC, won_points DESC, lost_points ASC
        ) AS placement
    FROM stats
    ORDER BY placement, display_name;
END$$

-- double ranking procedure
CREATE PROCEDURE get_double_ranking()
BEGIN
	WITH stats as (
		SELECT
			d.doubles_id,
            SUM(CASE	WHEN d.doubles_id = gd.player_a THEN s.points_a
						WHEN d.doubles_id = gd.player_b THEN s.points_b
                        END) AS won_points,
            SUM(CASE 	WHEN d.doubles_id = gd.player_a THEN s.points_b
						WHEN d.doubles_id = gd.player_b THEN s.points_a
                        END) AS lost_points,
            (
                SELECT COUNT(*)
                FROM games_double gd
                WHERE gd.winner_id = d.doubles_id AND gd.valid = TRUE
            ) AS won_games
		FROM doubles d
        INNER JOIN games_double gd
            ON d.doubles_id = gd.player_a OR d.doubles_id = gd.player_b
        INNER JOIN game_sets s
            ON s.set_id IN (gd.set_one, gd.set_two, gd.set_three)
		WHERE gd.valid = TRUE AND gd.overall_active = TRUE
        GROUP BY d.doubles_id
    )
    SELECT 
		*,
        RANK() OVER (
            ORDER BY won_games DESC, won_points DESC, lost_points ASC
        ) AS placement
    FROM stats
    ORDER BY placement, doubles_id;
END$$

DELIMITER ;