import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ Error: "You are not authenticated" });
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json({ Error: "Token not valid" });
    req.user = user;
    next();
  });
};

export const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("#");
};
