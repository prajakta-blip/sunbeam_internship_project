const express = require("express");
const crypto = require("crypto-js");
const pool = require("../db/pool");
const { createResult } = require("../utils/result");
const { checkAuthorization } = require("../utils/auth");

const router = express.Router();

/* =====================================================
   POST /student/register-to-course
   body: { courseId, email, name, mobileNo }
===================================================== */
router.post("/register-to-course", checkAuthorization, (req, res) => {
  const { courseId, name, mobileNo } = req.body;
  const email = req.user.email;

  if (!courseId || !name || !mobileNo) {
    return res.send(createResult("All fields are required"));
  }

  pool.query(
    "SELECT reg_no FROM students WHERE email=?",
    [email],
    (err, rows) => {
      if (err) return res.send(createResult(err));

      const proceedEnroll = (studentId) => {
        pool.query(
          "INSERT INTO enrollments (studentId, courseId) VALUES (?, ?)",
          [studentId, courseId],
          err2 => {
            if (err2 && err2.code === "ER_DUP_ENTRY") {
              return res.send(
                createResult("Already registered for this course")
              );
            }
            res.send(createResult(err2, "Registered successfully"));
          }
        );
      };

      if (rows.length === 0) {
        // create student profile
        pool.query(
          `INSERT INTO students (name,email,course_id,mobile_no)
           VALUES (?,?,?,?)`,
          [name, email, courseId, mobileNo],
          (err2, result) => {
            if (err2) return res.send(createResult(err2));
            proceedEnroll(result.insertId);
          }
        );
      } else {
        proceedEnroll(rows[0].reg_no);
      }
    }
  );
});

/* =====================================================
   GET /student/my-courses
===================================================== */
router.get("/my-courses", checkAuthorization, (req, res) => {
  pool.query(
    `
    SELECT c.*
    FROM students s
    JOIN enrollments e ON e.studentId = s.reg_no
    JOIN courses c ON c.id = e.courseId
    WHERE s.email = ?
    `,
    [req.user.email],
    (err, rows) => res.send(createResult(err, rows))
  );
});

/* =====================================================
   GET /student/my-course-with-videos
===================================================== */
router.get("/my-course-with-videos", checkAuthorization, (req, res) => {
  pool.query(
    `
    SELECT
      c.id AS courseId,
      c.courseName,
      c.description AS courseDescription,
      v.id AS videoId,
      v.title,
      v.youtubeURL,
      v.description AS videoDescription
    FROM students s
    JOIN enrollments e ON e.studentId = s.reg_no
    JOIN courses c ON c.id = e.courseId
    LEFT JOIN videos v ON v.courseId = c.id
    WHERE s.email = ?
    `,
    [req.user.email],
    (err, rows) => {
      if (err) return res.send(createResult(err));

      const result = {};
      rows.forEach(r => {
        if (!result[r.courseId]) {
          result[r.courseId] = {
            course: {
              id: r.courseId,
              courseName: r.courseName,
              description: r.courseDescription,
            },
            videos: [],
          };
        }
        if (r.videoId) {
          result[r.courseId].videos.push({
            id: r.videoId,
            title: r.title,
            youtubeURL: r.youtubeURL,
            description: r.videoDescription,
          });
        }
      });

      res.send(createResult(null, Object.values(result)));
    }
  );
});

/* =====================================================
   PUT /student/change-password
   body: { newPassword, confirmPassword }
===================================================== */
router.put("/change-password", checkAuthorization, (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res.send(createResult("Password fields are required"));
  }

  if (newPassword !== confirmPassword) {
    return res.send(createResult("Passwords do not match"));
  }

  const hashed = crypto.SHA256(newPassword).toString();

  pool.query(
    "UPDATE users SET password=? WHERE email=?",
    [hashed, req.user.email],
    err => res.send(createResult(err, "Password updated successfully"))
  );
});

module.exports = router;
