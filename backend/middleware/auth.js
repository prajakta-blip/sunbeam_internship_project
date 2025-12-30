const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({
      status: "error",
      error: "Token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      status: "error",
      error: "Invalid token",
    });
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).send({
      status: "error",
      error: "Admin access only",
    });
  }
  next();
};
