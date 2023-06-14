import { fetchData, fetchRow } from "../../utils/postgres.js";

// queries
const CREATE_TEACHER = `INSERT INTO users(name, password, phone, info, course_id, image, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

const ALL_USERS = `SELECT * FROM users`;

const TEACHERS = `SELECT
t.id,
t.name,
t.phone,
t.info,
t.image,
c.title as course,
to_char(t.created_at, 'DD/MM/YYYY HH:MM:SS') as created_at,
json_agg(g.title) as groups
FROM
users t
LEFT JOIN
courses c
on
t.course_id = c.id
LEFT JOIN
groups g
on
t.id = g.teacher_id
WHERE
status = 2
group by t.name, t.phone, t.info, c.title, t.created_at, t.id`;

const UPDATE_USERS = `
UPDATE
    users
SET
    name = $1,
    password = $2,
    phone = $3,
    info = $4,
    course_id = $5,
    image = $6
where
    id = $7
RETURNING *
`;

const DELETE_USER = `DELETE FROM users WHERE id = $1 RETURNING *`;

const CREATE_STUDENT = `INSERT INTO users(name, password, phone, image) VALUES($1, $2, $3, $4) RETURNING *`;

const CREATE_GRADUATE = `INSERT INTO users(name, password, phone, image, info, study_at, course_id, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

const CREATE_STUDENT_GROUP = `INSERT INTO student_groups(student_id, group_id) VALUES($1, $2) RETURNING *`;

const STUDENTS = `
SELECT
s.id,
s.name,
c.title as course,
g.title as group,
s.password,
s.phone,
s.image,
TO_CHAR(s.created_at, 'DD/MM/YYY HH:MM:SS') as created_at
FROM
users s
JOIN
student_groups sg
ON
s.id = sg.student_id
JOIN
groups g
ON
g.id = sg.group_id
JOIN
courses c
ON
g.course_id = c.id
WHERE
s.status = 1
`;

const GET_GRADUATES = `
SELECT
    u.id,
    u.name,
    u.phone,
    u.info,
    c.title as course,
    u.image,
    u.study_at,
    to_char(u.created_at, 'DD-MM-YYYY') AS created_at
FROM
    users u
LEFT JOIN
    courses c
ON
    u.course_id = c.id
WHERE
    u.status = 4 AND u.state = 1
ORDER BY
    u.created_at DESC
`;

// functions
const createStudent = async (name, password, phone, image) =>
  await fetchRow(CREATE_STUDENT, name, password, phone, image);

const createStudentGroup = async (student_id, group_id) =>
  await fetchRow(CREATE_STUDENT_GROUP, student_id, group_id);

const createTeacher = async (name, password, phone, info, course_id, image) =>
  await fetchRow(
    CREATE_TEACHER,
    name,
    password,
    phone,
    info,
    course_id,
    image,
    2
  );

const allUsers = async () => await fetchData(ALL_USERS);

const updateUser = async (
  name,
  password,
  phone,
  info,
  course_id,
  image,
  id
) => {
  const oldUser = await fetchRow(`select * from users where id = $1`, id);

  if (oldUser) {
    const updatedUser = await fetchRow(
      UPDATE_USERS,
      name || oldUser.name,
      password || oldUser.password,
      phone || oldUser.phone,
      info || oldUser.info,
      course_id || oldUser.course_id,
      image || oldUser.image,
      id
    );

    if (updatedUser) return updateUser;
  }
};

const deleteUser = async (id) => fetchRow(DELETE_USER, id);

const allTeachers = async () => await fetchData(TEACHERS);

const allStudents = async () => await fetchData(STUDENTS);

const createGraduate = async (
  name,
  password,
  phone,
  image,
  info,
  study_at,
  course_id,
  status
) =>
  await fetchRow(
    CREATE_GRADUATE,
    name,
    password,
    phone,
    image,
    info,
    study_at,
    course_id,
    status
  );

const getGraduates = async () => await fetchData(GET_GRADUATES);

export default {
  createTeacher,
  allUsers,
  updateUser,
  deleteUser,
  allTeachers,
  createStudent,
  createStudentGroup,
  allStudents,
  createGraduate,
  getGraduates,
};
