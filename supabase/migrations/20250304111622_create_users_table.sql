CREATE TABLE users (
    id UUID PRIMARY KEY,
    fullname TEXT,
    created_at TIMESTAMP DEFAULT now()
);