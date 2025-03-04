CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    fullname TEXT,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_friends (
    user_id UUID NOT NULL REFERENCES users(id),
    friend_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY(user_id, friend_id)
);

CREATE TABLE IF NOT EXISTS friend_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uniq_sender_receiver_status UNIQUE (sender_id, receiver_id)
);
