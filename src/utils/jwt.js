import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;

const sign = async (payload) => await jwt.sign(payload, "SECRET_KEY");

const verify = async (token) =>
  await jwt.verify(token, "SECRET_KEY", (err, decode) => {
    if (err instanceof JsonWebTokenError) {
      return "Token not valid";
    }

    if (err instanceof TokenExpiredError) {
      return "Token expired";
    }

    return decode;
  });

export { sign, verify };
