import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgres://postgres:ubk_01001@localhost:5432/bmi",
});

const fetchData = async (SQL, ...params) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(SQL, params || null);
    return rows;
  } finally {
    client.release();
  }
};

const fetchRow = async (SQL, ...params) => {
  const client = await pool.connect();

  try {
    const {
      rows: [row],
    } = await client.query(SQL, params || null);
    return row;
  } finally {
    client.release();
  }
};

export { fetchData, fetchRow };