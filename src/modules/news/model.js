import { fetchData, fetchRow } from "../../utils/postgres.js";

const GET_ALL_NEWS = `select id, title, text, TO_CHAR(created_at, 'DD/MM/YYYY HH:MM:SS') as created_at, status, photo from news ORDER by created_at`;

const CREATE_NEW_NEWS = `
    INSERT INTO news(title, text, photo)
    values($1, $2, $3) RETURNING *
`;

const DELETE = `delete from news where id = $1 RETURNING *`;

const UPDATE = `UPDATE news
SET status = CASE WHEN status = TRUE THEN FALSE ELSE TRUE END where id = $1 RETURNING *`;

const allNews = async () => await fetchData(GET_ALL_NEWS);
const createNews = async (title, text, photo) =>
  await fetchData(CREATE_NEW_NEWS, title, text, photo);

const deleteNews = async (id) => await fetchRow(DELETE, id);

const updateNews = async (id) => await fetchRow(UPDATE, id);

export default { allNews, createNews, deleteNews, updateNews };
