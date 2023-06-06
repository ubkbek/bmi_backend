import { fetchData, fetchRow } from "../../utils/postgres.js";

const CREATE_COURSE = `INSERT INTO courses(title, price, description, photo) VALUES($1, $2, $3, $4) RETURNING *`;
const ALL_COURSES = `select id, title, price, description, photo, TO_CHAR(created_at, 'DD-MM-YYY HH:MM:SS') as created_at from courses order by title`;
const DELETE = `DELETE FROM courses WHERE id = $1 RETURNING *`;
const UPDATE = `UPDATE courses SET title = $1, price = $2, description = $3 WHERE id = $4 RETURNING *`;
const GET_COURSE_TEACHERS = `select * from users where course_id = $1 ORDER BY created_at`;

const createCourse = async (title, price, discription, photo) =>
  await fetchRow(CREATE_COURSE, title, price, discription, photo);

const allCourses = async () => await fetchData(ALL_COURSES);

const deleteCourse = async (id) => fetchRow(DELETE, id);

const updateCourse = async (title, price, description, id) => {
  const oldCourse = await fetchRow(`select * from courses where id = $1`, id);

  const updated = await fetchRow(
    UPDATE,
    title || oldCourse.title,
    price || oldCourse.price,
    description || oldCourse.description,
    id
  );

  return updated;
};

const getCourseTeachers = async (id) => fetchData(GET_COURSE_TEACHERS, id);

export default { createCourse, allCourses, deleteCourse, updateCourse, getCourseTeachers };
