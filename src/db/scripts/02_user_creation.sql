CREATE USER IF NOT EXISTS 'scu_api'@'%' IDENTIFIED BY 'ql_this_is_the_api_ql';
GRANT ALL PRIVILEGES ON scu_db.* TO 'scu_api'@'%';
FLUSH PRIVILEGES;