// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;
import "dotenv/config";

// สร้าง Connection Pool สำหรับ PostgreSQL
const connectionPool = new Pool({
  user: process.env.DB_USERNAME,
  host: "localhost",
  database: "QandA",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default connectionPool;
