const { Router } = require("express");

const userRouter = Router();
//routes
userRouter.post("/signup", (req, res) => {
  res.json({
    message: "user signed up.",
  });
});
userRouter.post("/signin", (req, res) => {
  res.json({
    message: "user loged in.",
  });
});
userRouter.post("/purchase-course", (req, res) => {
  res.json({
    message: "purchase courses.",
  });
});
userRouter.get("/all-courses", (req, res) => {
  res.json({
    message: "all available courses.",
  });
});
userRouter.get("/purchased-courses", (req, res) => {
  res.json({
    message: "your courses.",
  });
});

module.exports = userRouter;
