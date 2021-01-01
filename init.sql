-- 创建数据库
CREATE SCHEMA `myblog` ;

-- 如果提示安全模式可以运行下行指令
SET SQL_SAFE_UPDATES=0;

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

SELECT * FROM users WHERE `password` LIKE '%y%';

SELECT * FROM users WHERE username LIKE '%文%' ORDER BY id DESC;

-- 更新
UPDATE users SET realname='又文' WHERE username='layouwen';

-- 删除
--DELETE FROM users WHERE username='wangyu';
UPDATE users SET state='0' WHERE username='wangyu';

-- 修改表结构
ALTER TABLE `myblog`.`users`
ADD COLUMN `state` INT NOT NULL DEFAULT 1 AFTER `realname`;

-- 查看所有没有禁用的用户
SELECT * FROM users WHERE state<>'0';

-- 暂时不考虑软删除
ALTER TABLE `myblog`.`users`
DROP COLUMN `state`;

-- 添加 blogs 数据
INSERT INTO blogs (title, content, createtime, author) values
('标题A', '内容A', '1609314432391', 'layouwen'),
('标题B', '内容B', '1609314454130', 'wangyu');
