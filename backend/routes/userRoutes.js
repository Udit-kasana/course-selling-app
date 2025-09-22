const { Router } = require("express");
const {
  userSignup,
  userSignin,
  purchaseCourse,
} = require("../controllers/userControllers");
const { userAuth } = require("../middlewares/auth");

const userRouter = Router();

//routes
userRouter.post("/signup", userSignup);
userRouter.post("/signin", userSignin);
userRouter.post("/purchase-course/:id", userAuth, purchaseCourse);
userRouter.get("/all-courses", userAuth, (req, res) => {
  res.json({
    message: "all available courses.",
  });
});
userRouter.get("/purchased-courses", userAuth, (req, res) => {
  res.json({
    message: "your courses.",
  });
});

module.exports = userRouter;
