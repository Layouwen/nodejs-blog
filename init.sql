

-- 创建user表
CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

-- 创建 blogs 表
CREATE TABLE `myblog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL DEFAULT 0,
  `author` VARCHAR(29) NOT NULL,
  PRIMARY KEY (`id`));

-- 添加用户
INSERT INTO users (username, `password`, realname) values ('layouwen', 'layouwen', '梁又文');
INSERT INTO users (username, `password`, realname) values ('wangyu', 'wangyu', '王煜');

-- 查看表 users
--SELECT * from users;
SELECT id,username FROM users;

SELECT * FROM users WHERE username='wangyu' AND `password`='wangyu';

SELECT * FROM users WHERE password LIKE '%y%';
