const { Router } = require("express");
const {
  userSignup,
  userSignin,
  purchaseCourse,
  getYourCourses,
  getAllCourses,
} = require("../controllers/userControllers");
const { auth } = require("../middlewares/auth");

const userRouter = Router();

//routes
userRouter.post("/signup", userSignup);
userRouter.post("/signin", userSignin);
userRouter.post("/purchase-course/:id", auth, purchaseCourse);
userRouter.get("/all-courses", auth, getAllCourses);
userRouter.get("/purchased-courses", auth, getYourCourses);

module.exports = userRouter;
