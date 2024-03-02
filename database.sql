CREATE DATABASE IF NOT EXISTS user_authentication;
USE user_authentication;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS login_activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    successful BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
