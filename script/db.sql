CREATE DATABASE user_app;

USE user_app;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE usuarios (
  id       INT(11) NOT NULL,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(60) NOT NULL,
  email    VARCHAR(100) NOT NULL
);

ALTER TABLE usuarios
  ADD PRIMARY KEY (id);

ALTER TABLE usuarios
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE usuarios;

