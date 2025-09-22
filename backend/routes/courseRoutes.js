const { Router } = require("express");
const { adminAuth } = require("../middlewares/adminAuth");
const { adminAuthR } = require("../middlewares/auth");
const {
  createCourse,
  addCourseContent,
  updateCourseContent,
  deleteCourse,
} = require("../controllers/courseControllers");

const courseRouter = Router();
//course routes
courseRouter.post("/create-course", adminAuthR, adminAuth, createCourse);

courseRouter.post(
  "/add-course-content/:id",
  adminAuthR,
  adminAuth,
  addCourseContent
);

courseRouter.delete("/delete-course/:id", adminAuthR, adminAuth, deleteCourse);

courseRouter.put(
  "/update-course-content/:id",
  adminAuthR,
  adminAuth,
  updateCourseContent
);

module.exports = courseRouter;
