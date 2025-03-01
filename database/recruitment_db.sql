create database recruitment_db;
use recruitment_db;
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file VARCHAR(255) NOT NULL
);

CREATE TABLE recruiter_assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    recruiter1 VARCHAR(255),
    recruiter2 VARCHAR(255),
    recruiter3 VARCHAR(255),
    comments TEXT,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);