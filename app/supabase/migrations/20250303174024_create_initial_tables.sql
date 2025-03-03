CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    fullname TEXT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);