import model from "./model.js";
import { sign } from "../../utils/jwt.js";

const login = async (req, res) => {
  const { name, password } = req.body;

  const foundUser = await model.login(name, password);

  if (foundUser) {
    return res.status(200).json({
      message: "Ok",
      access_token: await sign(foundUser.id),
      role: foundUser.status,
    });
  } else
    return res.status(404).json({
      staus: 404,
      message: "User not found",
    });
};

export default { login };
