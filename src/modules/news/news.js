import model from "./model.js";

const GET = async (req, res) => {
  return res.json(await model.allNews());
};

const POST = async (req, res) => {
  try {
    const { title, text, photo } = req.body;

    if (title && text) {
      const newNews = await model.createNews(title, text, photo);

      return res.status(201).json(newNews);
    } else {
      return res.status(401).json("Imformation must be completed");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(error.statusCode).json("Internal Server Error!");
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const deleted = await model.deleteNews(id);

      return res.status(201).json(deleted);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(error.statusCode).json("Internal Server Error!");
  }
};

const PUT = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await model.updateNews(id);
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error.message);
    return res.status(error.statusCode).json("Internal Server Error!");
  }
};
export default { GET, POST, DELETE, PUT };
