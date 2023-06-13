import { fetchData, fetchRow } from "../../utils/postgres.js";

const CREATE = `INSERT INTO appeals (name, phone, message, course_id) VALUES($1, $2, $3, $4) RETURNING *`;
const GET = `
select
    a.id,
    a.name,
    a.phone,
    a.message,
    a.answered,
    c.title,
    to_char(a.created_at, 'DD/MM/YYYY HH:MM:SS') as created_at
from
    appeals a
LEFT JOIN
    courses c
ON
    c.id = a.course_id
ORDER BY
    a.created_at DESC`;

const UPDATE = `UPDATE appeals
SET answered = CASE WHEN answered = TRUE THEN FALSE ELSE TRUE END where id = $1 RETURNING *`;

const createAppeal = async (name, phone, message, course_id) =>
  await fetchRow(CREATE, name, phone, message, course_id);
const allAppials = async () => await fetchData(GET);
const update = async (id) => await fetchRow(UPDATE, id);

export default { createAppeal, allAppials, update };
