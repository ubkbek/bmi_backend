import model from "./model.js";

const POST = async (req, res) => {
  try {
    const { title, price, description, photo } = req.body;

    if (title && price) {
      const allCourses = await model.allCourses();

      const foundCourse = allCourses.find(
        (e) => e.title == title && e.price == price
      );

      if (foundCourse)
        return res.status(400).json("This course already exists!");

      const newCourse = await model.createCourse(
        title,
        price,
        description,
        photo
      );

      if (newCourse) {
        return res.status(201).json(newCourse);
      }
    }
  } catch (err) {
    return res.status(500).json("Internal Server Error");
  }
};

const GET = async (req, res) => {
  try {
    const allCourses = await model.allCourses();
    return res.status(200).json(allCourses);
  } catch (err) {
    return res.status(500).json("Internal Server Error");
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await model.deleteCourse(id);

    if (deletedCourse)
      return res.status(200).json({
        message: "Deleted course successfully",
        deletedCourse,
      });

    // return res.status(200).json("Deleted Course");
  } catch (err) {
    return res.status(500).json("Internal Server Error");
  }
};

const PUT = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, price, description } = req.body;

    const updated = await model.updateCourse(title, price, description, id);

    if (updated) {
      return res.status(200).json({
        message: "Course updated successfully",
        updated: updated,
      });
    }
  } catch (err) {
    return res.status(500).json("Internal Server Error!");
  }
};

const GET_COURSE_TEACHERS = async (req, res) => {
  try {
    const { id } = req.params;
    const teachers = await model.getCourseTeachers(id);
    return res.status(200).json(teachers);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error!");
  }
};

export default {
  POST,
  GET,
  DELETE,
  PUT,
  GET_COURSE_TEACHERS,
};
