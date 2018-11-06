import pg from "pg";
import config from "../../../config";

const pool = new pg.Pool({
  database: config.db,
  host: config.host,
  password: config.pass,
  port: config.port,
  user: config.user,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const conn = async (logic: (client: pg.PoolClient) => any) => {
  const client = await pool.connect();
  try {
    await logic(client);
  } finally {
    client.release();
  }
};

export default conn;
