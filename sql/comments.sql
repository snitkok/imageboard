  DROP TABLE IF EXISTS comments;

  CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment_text TEXT NOT NULL,
    username TEXT NOT NULL,
    image_id INTEGER NOT NULL REFERENCES images(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );