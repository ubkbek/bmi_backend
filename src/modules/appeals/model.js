import { fetchData, fetchRow } from "../../utils/postgres.js";

const CREATE = `INSERT INTO appeals (name, phone, message) VALUES($1, $2, $3) RETURNING *`;
const GET = `SELECT id, name, phone, message, answered, to_char(created_at, 'DD/MM/YYYY HH:MM:SS') as created_at FROM appeals
order by created_at desc`;
const UPDATE = `UPDATE appeals
SET answered = CASE WHEN answered = TRUE THEN FALSE ELSE TRUE END where id = $1 RETURNING *`;

const createAppeal = async (name, phone, message) =>
  await fetchRow(CREATE, name, phone, message);
const allAppials = async () => await fetchData(GET);
const update = async (id) => await fetchRow(UPDATE, id);

export default { createAppeal, allAppials, update };
