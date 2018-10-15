const pg = require("pg");
const config = require("../../../config");

async function post(req, res) {
  const { text, complete } = req.body;

  const { user, pass } = config.db;
  const connectionString = `postgres://${user}:${pass}@localhost:5432/todos`;

  const client = new pg.Client(connectionString);

  await client.connect();

  await client.query(
    `INSERT INTO items(text, complete) values('${text}', '${complete}')`
  );

  const result = await client.query("SELECT * FROM items ORDER BY id ASC");

  return res.status(200).json(result);
}

module.exports = {
  post
};
