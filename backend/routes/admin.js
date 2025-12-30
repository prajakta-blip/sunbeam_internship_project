const express = require("express");
const pool = require("../db/pool");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

/* ================= GET ALL STUDENTS ================= */
/* ================= FILTER BY COURSE ================= */
router.get("/students", verifyToken, verifyAdmin, (req, res) => {
  const { courseId } = req.query;

  let sql = `
    SELECT
      s.reg_no,
      s.name,
      s.email,
      s.mobile_no,
      GROUP_CONCAT(c.courseName SEPARATOR ', ') AS courses
    FROM students s
    LEFT JOIN enrollments e ON e.studentId = s.reg_no
    LEFT JOIN courses c ON c.id = e.courseId
  `;

  const params = [];

  if (courseId) {
    sql += ` WHERE c.id = ? `;
    params.push(courseId);
  }

  sql += `
    GROUP BY s.reg_no, s.name, s.email, s.mobile_no
  `;

  pool.query(sql, params, (err, rows) => {
    if (err) {
      return res.send({
        status: "error",
        error: err.message,
      });
    }

    res.send({
      status: "success",
      data: rows,
    });
  });
});

module.exports = router;
