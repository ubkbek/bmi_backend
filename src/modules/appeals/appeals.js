import model from "./model.js";

const GET = async (req, res) => {
  try {
    const appeals = await model.allAppials();
    return res.json({
      message: "Ok",
      appeals,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error!");
  }
};

const POST = async (req, res) => {
  try {
    const { name, phone, message, course_id } = req.body;

    if (name && phone && course_id) {
      const newAppeal = await model.createAppeal(
        name,
        phone,
        message,
        course_id
      );

      if (newAppeal) {
        return res.status(201).json({
          newAppeal,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error!");
  }
};

const PUT = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const updated = await model.update(id);
      if (updated) return res.status(201).json({ updated });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error!");
  }
};

export default {
  GET,
  POST,
  PUT,
};
