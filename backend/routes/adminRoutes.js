const { Router } = require("express");

const adminRouter = Router();
//routes
adminRouter.post("/signup", (req, res) => {
  res.json({
    message: "admin signed up.",
  });
});
adminRouter.post("/signin", (req, res) => {
  res.json({
    message: "admin loged in.",
  });
});
adminRouter.post("/create-course", (req, res) => {
  res.json({
    message: "admin created a course.",
  });
});
adminRouter.post("/add-course-content", (req, res) => {
  res.json({
    message: "course contents.",
  });
});
adminRouter.put("/update-course-content", (req, res) => {
  res.json({
    message: "course contents updated.",
  });
});
adminRouter.delete("/delete-course", (req, res) => {
  res.json({
    message: "admin deleted a course.",
  });
});

module.exports = adminRouter;
