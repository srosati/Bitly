CREATE TABLE users (
    id       SERIAL PRIMARY KEY,
    email    TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE tags (
    id       SERIAL PRIMARY KEY,
    name     TEXT UNIQUE NOT NULL,
    user_id  INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE urls (
    id          SERIAL PRIMARY KEY,
    redirect_to TEXT NOT NULL,
    alias       TEXT UNIQUE NOT NULL,
    title       TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    clicks      INTEGER NOT NULL DEFAULT 0,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE url_tags (
    url_id   INTEGER NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
    tag_id   INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE
);
