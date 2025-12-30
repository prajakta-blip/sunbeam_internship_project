const express = require("express");
const pool = require("../db/pool");
const { createResult } = require("../utils/result");
const { checkAuthorization, checkAdmin } = require("../utils/auth");

const router = express.Router();

/* =====================================================
   GET ALL VIDEOS
   GET /video/all-videos
   Optional query: courseId
===================================================== */
router.get("/all-videos", (req, res) => {
  const { courseId } = req.query;

  let sql = `
    SELECT
      v.id,
      v.courseId,
      c.courseName,
      v.title,
      v.youtubeURL,
      v.description,
      v.added_at
    FROM videos v
    JOIN courses c ON v.courseId = c.id
  `;

  const params = [];

  if (courseId) {
    sql += " WHERE v.courseId = ?";
    params.push(courseId);
  }

  pool.query(sql, params, (err, rows) =>
    res.send(createResult(err, rows))
  );
});

/* =====================================================
   ADD VIDEO (ADMIN)
   POST /video/add
===================================================== */
router.post("/add", checkAuthorization, checkAdmin, (req, res) => {
  const { courseId, title, youtubeURL, description } = req.body;

  pool.query(
    `
    INSERT INTO videos (courseId, title, youtubeURL, description)
    VALUES (?, ?, ?, ?)
    `,
    [courseId, title, youtubeURL, description],
    err => res.send(createResult(err, "Video added successfully"))
  );
});

/* =====================================================
   UPDATE VIDEO (ADMIN)
   PUT /video/update/:videoId
===================================================== */
router.put(
  "/update/:videoId",
  checkAuthorization,
  checkAdmin,
  (req, res) => {
    const { courseId, title, youtubeURL, description } = req.body;

    pool.query(
      `
      UPDATE videos SET
        courseId = ?,
        title = ?,
        youtubeURL = ?,
        description = ?
      WHERE id = ?
      `,
      [courseId, title, youtubeURL, description, req.params.videoId],
      err => res.send(createResult(err, "Video updated successfully"))
    );
  }
);

/* =====================================================
   DELETE VIDEO (ADMIN)
   DELETE /video/delete/:videoId
===================================================== */
router.delete(
  "/delete/:videoId",
  checkAuthorization,
  checkAdmin,
  (req, res) => {
    pool.query(
      "DELETE FROM videos WHERE id = ?",
      [req.params.videoId],
      err => res.send(createResult(err, "Video deleted successfully"))
    );
  }
);

/* =====================================================
   ADMIN → ENROLLED STUDENTS
   GET /video/admin/enrolled-students
   Optional query: courseId
===================================================== */
router.get(
  "/admin/enrolled-students",
  checkAuthorization,
  checkAdmin,
  (req, res) => {
    const { courseId } = req.query;

    let sql = `
      SELECT
        s.reg_no,
        s.name,
        s.email,
        s.mobile_no,
        GROUP_CONCAT(c.courseName SEPARATOR ', ') AS courses
      FROM enrollments e
      JOIN students s ON s.reg_no = e.studentId
      JOIN courses c ON c.id = e.courseId
    `;

    let params = [];

    if (courseId) {
      sql += " WHERE c.id = ?";
      params.push(courseId);
    }

    sql += " GROUP BY s.reg_no";

    pool.query(sql, params, (err, rows) =>
      res.send(createResult(err, rows))
    );
  }
);
/* ================================
   GET SINGLE VIDEO
   GET /video/:id
================================ */
router.get("/:id", checkAuthorization, checkAdmin, (req, res) => {
  pool.query(
    "SELECT * FROM videos WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.send(createResult(err));
      if (rows.length === 0)
        return res.send(createResult("Video not found"));

      res.send(createResult(null, rows[0]));
    }
  );
});

module.exports = router;
