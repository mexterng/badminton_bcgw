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