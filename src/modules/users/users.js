import usersModel from "./model.js";

const ALL_USERS = async (req, res) => {
  const users = await usersModel.allUsers();
  if (users) {
    return res.status(200).json(users);
  }
};

const CREATE_TEACHER = async (req, res) => {
  try {
    const { name, password, phone, info, course_id, image } = req.body;

    if (name && password && phone && info && course_id && image) {
      const allUsers = await usersModel.allUsers();

      const foundUser = allUsers.find(
        (e) => e.name == name && e.password == password
      );

      if (foundUser) return res.status(400).json("This user is already exists");

      const newTeacher = await usersModel.createTeacher(
        name,
        password,
        phone,
        info,
        course_id,
        image
      );

      return res.status(201).json(newTeacher);
    }
  } catch (err) {
    return res.status(501).json("Internal Server Error!");
  }
};

const UPDATE_USER = async (req, res) => {
  const { id } = req.params;
  const { name, password, phone, info, course_id, image } = req.body;

  const updatedUser = await usersModel.updateUser(
    name,
    password,
    phone,
    info,
    course_id,
    image,
    id
  );

  if (updatedUser) {
    return res.status(200).json({
      status: 200,
      message: "User updated successfully!",
      updatedUser,
    });
  } else {
    return res.json("Internal Server Error");
  }
};

const DELETE_USER = async (req, res) => {
  const { id } = req.params;

  if (id) {
    const deletedUser = await usersModel.deleteUser(id);

    if (deletedUser) {
      return res.status(200).json({
        status: 200,
        message: "User deleted successfully!",
        deletedUser,
      });
    }
  }
};

const GET_TEACHERS = async (req, res) => {
  try {
    const teachers = await usersModel.allTeachers();
    return res.status(200).json(teachers);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error!");
  }
};

const GET_STUDENTS = async (_, res) => {
  try {
    const students = await usersModel.allStudents();
    return res.status(200).json(students);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error!");
  }
};

const CREATE_STUDENT = async (req, res) => {
  try {
    const { name, password, phone, group_id, image } = req.body;

    const newStudent = await usersModel.createStudent(
      name,
      password,
      phone,
      image
    );

    const student_id = newStudent.id;

    await usersModel.createStudentGroup(student_id, group_id);

    return res.status(201).json({
      status: 201,
      message: "Student created successfully!",
      newStudent,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error!");
  }
};

const CREATE_GRADUATE = async (req, res) => {
  try {
    const { name, password, phone, image, info, study_at, course_id } =
      req.body;

    const newGraduate = await usersModel.createGraduate(
      name,
      password,
      phone,
      image,
      info,
      study_at,
      course_id,
      4
    );

    return res.status(201).json(newGraduate);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error!");
  }
};

const GET_GRADUATES = async (req, res) => {
  try {
    const graduates = await usersModel.getGraduates();
    return res.status(200).json(graduates);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error!");
  }
};

export default {
  CREATE_TEACHER,
  ALL_USERS,
  UPDATE_USER,
  DELETE_USER,
  GET_TEACHERS,
  CREATE_STUDENT,
  GET_STUDENTS,
  CREATE_GRADUATE,
  GET_GRADUATES,
};
