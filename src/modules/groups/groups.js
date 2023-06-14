import model from "./model.js";

const CREATE = async (req, res) => {
  const { title, course_id, teacher_id } = req.body;

  const groups = await model.allGroups();

  if (groups) {
    const foundGroup = groups.find((e) => e.title == title);

    if (foundGroup) return res.status(400).json("This group already exists!");
  }

  if ((title, course_id, teacher_id)) {
    const newGroup = await model.createGroup(title, course_id, teacher_id);

    if (newGroup)
      return res.status(201).json({
        status: 200,
        message: "Group created successfully!",
        newGroup,
      });
  } else
    return res.status(400).json({
      status: 400,
      error: "Information must be complete!!!",
    });
};

const ALL_GROUPS = async (req, res) => {
  try {
    const allGroups = await model.allGroups();

    if (allGroups) return res.status(200).json(allGroups);

    return res.status(500).json("Internal Server Error");
  } catch (err) {
    return res.status(500).json("Internal Server Error!");
  }
};

const UPDATE = async (req, res) => {
  const { id } = req.params;
  const { title, teacher_id } = req.body;

  const updatedGroup = await model.update(title, teacher_id, id);

  return res.json("ok");
  //   if (updatedGroup) return res.status(200).json(updatedGroup);
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await model.deleteGroup(id);
    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error!");
  }
};

const GET_COURSE_GROUPS = async (req, res) => {
  try {
    const { id } = req.params;
    const groups = await model.getCourseGroups(id);
    return res.status(200).json(groups);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error!");
  }
};

const GET_TEACHER_GROUPS = async (req, res) => {
  try {
    const groups = await model.getTeacherGroups(req.verifyId);
    return res.status(200).json(groups);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error!");
  }
};

export default {
  CREATE,
  ALL_GROUPS,
  UPDATE,
  DELETE,
  GET_COURSE_GROUPS,
  GET_TEACHER_GROUPS,
};
