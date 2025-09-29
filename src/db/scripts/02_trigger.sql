DELIMITER $$

CREATE TRIGGER set_doubles_overall_active
BEFORE INSERT ON doubles
FOR EACH ROW
BEGIN
    DECLARE active_a BOOLEAN;
    DECLARE active_b BOOLEAN;

    SELECT overall_active INTO active_a
    FROM member
    WHERE member_id = NEW.player_a;

    SELECT overall_active INTO active_b
    FROM member
    WHERE member_id = NEW.player_b;

    IF active_a AND active_b THEN
        SET NEW.overall_active = TRUE;
    ELSE
        SET NEW.overall_active = FALSE;
    END IF;
END$$

DELIMITER ;

-- check for already existing double

DELIMITER $$

CREATE TRIGGER check_duplicate_doubles
BEFORE INSERT ON doubles
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM doubles
        WHERE 
            (player_a = NEW.player_a AND player_b = NEW.player_b)
            OR (player_a = NEW.player_b AND player_b = NEW.player_a)
    ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Duplicate doubles pair not allowed';
    END IF;
END$$

DELIMITER ;

-- check for game not against oneself
-- doubles

DELIMITER $$

CREATE TRIGGER check_double_game_is_not_self_game
BEFORE INSERT ON games_double
FOR EACH ROW
BEGIN
    IF NEW.player_a = NEW.player_b THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Same playing pair not allowed';
    END IF;
END$$

DELIMITER ;

-- singles

DELIMITER $$

CREATE TRIGGER check_single_game_is_not_self_game
BEFORE INSERT ON games_single
FOR EACH ROW
BEGIN
    IF NEW.player_a = NEW.player_b THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Same playing player not allowed';
    END IF;
END$$

DELIMITER ;