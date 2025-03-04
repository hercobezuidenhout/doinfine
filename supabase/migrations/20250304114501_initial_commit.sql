CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    fullname TEXT,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_friends (
    user_id UUID NOT NULL REFERENCES users(id),
    friend_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now()
);