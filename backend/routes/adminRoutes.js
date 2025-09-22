const { Router } = require("express");
const {
  adminSignup,
  adminSignin,
  promoteUser,
} = require("../controllers/adminControllers");
const { adminAuth } = require("../middlewares/adminAuth");
const { auth } = require("../middlewares/auth");

const adminRouter = Router();
//routes
adminRouter.post("/signup", adminSignup);
adminRouter.post("/signin", adminSignin);
adminRouter.post("/promote/:id", auth, adminAuth, promoteUser);

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
