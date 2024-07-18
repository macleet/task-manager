CREATE DATABASE task_manager_v2;

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    due_date DATE,
    priority BOOLEAN,
    folder VARCHAR(255)
);

CREATE TABLE folders(
    folder_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

INSERT INTO folders (name) VALUES ('Main');
