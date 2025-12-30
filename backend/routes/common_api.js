const express = require("express");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");
const { createResult } = require("../utils/result");
const { SECRET } = require("../utils/config");

const router = express.Router();
router.post("/register", (req, res) => {
  const { name, email, password, mobile_no } = req.body;

  if (!name || !email || !password || !mobile_no) {
    return res.send(createResult("All fields are required"));
  }

  const hashed = crypto.SHA256(password).toString();

  // check user
  pool.query(
    "SELECT email FROM users WHERE email=?",
    [email],
    (err, rows) => {
      if (err) return res.send(createResult(err));
      if (rows.length > 0) {
        return res.send(createResult("User already exists"));
      }

      // insert user
      pool.query(
        "INSERT INTO users (email,password,role) VALUES (?,?, 'STUDENT')",
        [email, hashed],
        err2 => {
          if (err2) return res.send(createResult(err2));

          // insert student
          pool.query(
            `
            INSERT INTO students (name,email,mobile_no)
            VALUES (?,?,?)
            `,
            [name, email, mobile_no],
            err3 => {
              if (err3) return res.send(createResult(err3));

              res.send(
                createResult(null, "User registered successfully")
              );
            }
          );
        }
      );
    }
  );
});

/* ================= LOGIN ================= */
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const hashed = crypto.SHA256(password).toString();

  pool.query(
    `
    SELECT u.email, u.role, s.reg_no, s.name, s.mobile_no
    FROM users u
    LEFT JOIN students s ON s.email = u.email
    WHERE u.email=? AND u.password=?
    `,
    [email, hashed],
    (err, rows) => {
      if (err || rows.length === 0) {
        return res.send(createResult("Invalid email or password"));
      }

      const token = jwt.sign(
        { email: rows[0].email, role: rows[0].role },
        SECRET,
        { expiresIn: "1d" }
      );

      res.send(
        createResult(null, {
          token,
          user: rows[0],
        })
      );
    }
  );
});

module.exports = router;
