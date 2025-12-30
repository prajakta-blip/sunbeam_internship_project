const express = require("express");
const cors = require("cors");

// ROUTES
const authRoutes = require("./routes/common_api");
const courseRoutes = require("./routes/course");
const studentRoutes = require("./routes/student");
const videoRoutes = require("./routes/video");

const app = express();
const adminRoutes = require("./routes/admin");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTE MAPPING
app.use("/auth", authRoutes);       // signin, signup
app.use("/course", courseRoutes);   // courses CRUD
app.use("/student", studentRoutes); // enrollments, my-courses
app.use("/video", videoRoutes);     // videos APIs
app.use("/admin", adminRoutes);

// HEALTH CHECK (OPTIONAL)
app.get("/", (req, res) => {
  res.send({
    status: "success",
    message: "MERN Project API is running 🚀",
  });
});

// SERVER START
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
