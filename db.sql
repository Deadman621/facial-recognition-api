CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

SELECT id, entries, RANK() OVER (ORDER BY entries DESC) as rank FROM users WHERE id = your_user_id;