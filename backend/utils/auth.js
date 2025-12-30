const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

function checkAuthorization(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.send({ status: "error", error: "Unauthorized" });
  }

  try {
    const token = header.split(" ")[1];
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.send({ status: "error", error: "Invalid token" });
  }
}

function checkAdmin(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.send({ status: "error", error: "Admin only" });
  }
  next();
}

module.exports = { checkAuthorization, checkAdmin };
