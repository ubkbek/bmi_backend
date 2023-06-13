import { fetchRow, fetchData } from "../../utils/postgres.js";

const CREATE = `INSERT INTO groups(title, course_id, teacher_id) VALUES ($1, $2, $3) RETURNING *`;
const ALL_GROUPS = `SELECT
g.id,
g.title AS title,
c.title AS course,
u.name AS teacher,
to_char(g.created_at, 'DD/MM/YYYY HH:MM:SS') as created_at
FROM
groups g
LEFT JOIN
courses c
ON
g.course_id = c.id
LEFT JOIN
users u
ON
g.teacher_id = u.id`;
const UPDATE = `UPDATE groups SET title = $1, teacher_id = $2 WHERE id = $3 RETURNING *`;
const DELETE = `delete from groups where id=$1 returning *`;
const COURSE_GROUPS = `SELECT * FROM groups WHERE course_id = $1`;
const TEACHER_GROUPS = `SELECT * FROM groups WHERE teacher_id = $1`;

const createGroup = async (title, course_id, teacher_id) =>
  await fetchRow(CREATE, title, course_id, teacher_id);

const allGroups = async () => await fetchData(ALL_GROUPS);

const update = async (title, teacher_id, id) => {
  const oldGroup = await fetchRow(
    `select * from groups where id=$1 RETURNING *`,
    id
  );

  if (oldGroup) {
    const updatedGroup = await fetchRow(
      UPDATE,
      title || oldGroup.title,
      teacher_id || oldGroup.teacher_id,
      id
    );

    if (updatedGroup) return updatedGroup;
  }
};

const getCourseGroups = async (course_id) =>
  await fetchData(COURSE_GROUPS, course_id);

const getTeacherGroups = async (teacher_id) =>
  await fetchData(TEACHER_GROUPS, teacher_id);

const deleteGroup = async (id) => await fetchRow(DELETE, id);

export default {
  createGroup,
  allGroups,
  update,
  deleteGroup,
  getCourseGroups,
  getTeacherGroups,
};
