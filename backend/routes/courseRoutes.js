const { Router } = require("express");
const { adminAuth } = require("../middlewares/adminAuth");
const {
  createCourse,
  addCourseContent,
  updateCourseContent,
  deleteCourse,
} = require("../controllers/courseControllers");

const courseRouter = Router();
//course routes
courseRouter.post("/create-course", adminAuth, createCourse);

courseRouter.delete("/delete-course/:id", adminAuth, deleteCourse);

courseRouter.post("/add-course-content/:id", adminAuth, addCourseContent);

courseRouter.put("/update-course-content/:id", adminAuth, updateCourseContent);

module.exports = courseRouter;
