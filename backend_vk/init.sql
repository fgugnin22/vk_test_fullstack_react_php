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
    author_name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_name) REFERENCES user(name)
);

CREATE TABLE reaction (
    user_id INT,
    post_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (post_id) REFERENCES post(id),
    PRIMARY KEY (user_id, post_id)
);