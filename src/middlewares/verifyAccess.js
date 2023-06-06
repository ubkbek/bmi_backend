import { verify } from "../utils/jwt.js";

const verifyAccess = async (req, res, next) => {
  const { access_token } = await req.headers;

  if (!access_token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const id = await verify(access_token);

  req.verifyId = id;

  next();
};

export default verifyAccess;
