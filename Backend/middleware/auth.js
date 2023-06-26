import Jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers("x-auth-token");

  if (!token)
    return res.status(401).send("Access denied. Not authenticated...");

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const user = Jwt.verify(token, secretKey);

    req.user = user;

    next();
  } catch (ex) {
    res.status(400).send("Access denied. Invalid auth token...");
  }
};

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  });
};

export { auth, isAdmin };
