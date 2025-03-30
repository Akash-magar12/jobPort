import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const token = req.cookies.auth;

  try {
    if (!token) {
      throw new Error("missing token");
    }
    const decoded = jwt.verify(token, "12345");
    if (!decoded) {
      res.status(401).json({ message: "invalid token" });
      throw new Error("Invalid token");
    }
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error.message);

    res.status(401).json({ message: "Unauthorized access" });
  }
};
