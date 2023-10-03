import jwt from "jsonwebtoken";

export const jwtSend = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY!);
};
