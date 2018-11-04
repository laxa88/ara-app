CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  house_id INTEGER REFERENCES houses(id),
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL
);