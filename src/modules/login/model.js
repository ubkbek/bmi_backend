import { fetchRow } from "../../utils/postgres.js";
const LOGIN = `SELECT * FROM users WHERE name = $1 AND password = $2`;

const login = async (name, password) => await fetchRow(LOGIN, name, password);

export default {
  login,
};
