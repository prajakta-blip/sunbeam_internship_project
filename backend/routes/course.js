const express = require("express");
const pool = require("../db/pool");
const { createResult } = require("../utils/result");
const { checkAuthorization, checkAdmin } = require("../utils/auth");

const router = express.Router();

/* =====================================================
   PUBLIC API
   GET /course/all-active-courses
===================================================== */
router.get("/all-active-courses", (req, res) => {
  pool.query(
    "SELECT * FROM courses WHERE isActive = 1",
    (err, rows) => res.send(createResult(err, rows))
  );
});

/* =====================================================
   ADMIN API
   GET /course/all-courses
   Optional query: startDate, endDate
===================================================== */
router.get(
  "/all-courses",
  checkAuthorization,
  checkAdmin,
  (req, res) => {
    const { startDate, endDate } = req.query;

    let sql = "SELECT * FROM courses";
    let params = [];

    if (startDate && endDate) {
      sql += " WHERE startDate <= ? AND endDate >= ?";
      params = [endDate, startDate];
    }

    pool.query(sql, params, (err, rows) =>
      res.send(createResult(err, rows))
    );
  }
);

/* =====================================================
   ADMIN API
   POST /course/add
===================================================== */
router.post(
  "/add",
  checkAuthorization,
  checkAdmin,
  (req, res) => {
    const {
      courseName,
      description,
      fees,
      startDate,
      endDate,
      expireDays
    } = req.body;

    if (
      !courseName ||
      !description ||
      !fees ||
      !startDate ||
      !endDate ||
      !expireDays
    ) {
      return res.send(createResult("All fields are required"));
    }

    pool.query(
      `
      INSERT INTO courses
      (courseName, description, fees, startDate, endDate, expireDays, isActive)
      VALUES (?, ?, ?, ?, ?, ?, 1)
      `,
      [
        courseName,
        description,
        fees,
        startDate,
        endDate,
        expireDays
      ],
      (err) => {
        if (err) {
          console.error(err);
          return res.send(createResult(err));
        }
        res.send(createResult(null, "Course added successfully"));
      }
    );
  }
);


/* =====================================================
   ADMIN API
   PUT /course/update/:courseId
===================================================== */
router.put(
  "/update/:courseId",
  checkAuthorization,
  checkAdmin,
  (req, res) => {
    const {
      courseName,
      description,
      fees,
      startDate,
      endDate,
      expireDays
    } = req.body;

    pool.query(
      `
      UPDATE courses SET
        courseName=?,
        description=?,
        fees=?,
        startDate=?,
        endDate=?,
        expireDays=?
      WHERE id=?
      `,
      [
        courseName,
        description,
        fees,
        startDate,
        endDate,
        expireDays,
        req.params.courseId
      ],
      err => res.send(createResult(err, "Course updated successfully"))
    );
  }
);

/* =====================================================
   PUBLIC API
   GET /course/:id
===================================================== */
router.get("/:id", (req, res) => {
  pool.query(
    "SELECT * FROM courses WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.send(createResult(err));
      if (rows.length === 0)
        return res.send(createResult("Course not found"));
      res.send(createResult(null, rows[0]));
    }
  );
});


/* =====================================================
   ADMIN API
   DELETE /course/delete/:courseId
===================================================== */
router.delete(
  "/delete/:courseId",
  checkAuthorization,
  checkAdmin,
  (req, res) => {
    pool.query(
      "DELETE FROM courses WHERE id=?",
      [req.params.courseId],
      err => res.send(createResult(err, "Course deleted successfully"))
    );
  }
);

module.exports = router;
