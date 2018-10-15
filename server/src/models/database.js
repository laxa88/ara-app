// Reference:
// https://mherman.org/blog/postgresql-and-nodejs/

const pg = require("pg");
const config = require("../../../config");

(async () => {
  const { user, pass } = config.db;
  const connectionString = `postgres://${user}:${pass}@localhost:5432/todos`;

  const client = new pg.Client(connectionString);
  await client.connect();

  await client.query(
    "CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)"
  );

  await client.end();
})();
