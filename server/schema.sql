CREATE TABLE IF NOT EXISTS tasks (
    task_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    due_date VARCHAR(32) DEFAULT '',
    priority INTEGER DEFAULT 1,
    folder_id INTEGER,
    notes VARCHAR(500) DEFAULT '',
    active_seconds INTEGER DEFAULT 0,
    tags VARCHAR(20)[] DEFAULT '{}'::VARCHAR[]
);

CREATE TABLE IF NOT EXISTS folders(
    folder_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS times(
    time_id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(task_id) ON DELETE CASCADE,
    elapsed_minutes INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT FALSE,
    rested_minutes INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS phases (
    phase_id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(task_id) ON DELETE CASCADE,
    phase_name VARCHAR(255) NOT NULL,
    phase_description TEXT,
    completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS steps (
    step_id SERIAL PRIMARY KEY,
    step_name VARCHAR(255) NOT NULL,
    step_description TEXT,
    estimated_time INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    phase_id INTEGER NOT NULL,
    CONSTRAINT fk_phase FOREIGN KEY (phase_id) REFERENCES phases(phase_id) ON DELETE CASCADE
);
