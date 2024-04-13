CREATE DATABASE IF NOT EXISTS task;

USE task;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    auth_token VARCHAR(255) NULL
);

CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES user(id)
);

CREATE TABLE reaction (
    user_id INT,
    post_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (post_id) REFERENCES post(id),
    PRIMARY KEY (user_id, post_id)
);