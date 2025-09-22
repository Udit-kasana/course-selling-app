const { Router } = require("express");
const {
  adminSignup,
  adminSignin,
  promoteUser,
} = require("../controllers/adminControllers");
const { adminAuth } = require("../middlewares/adminAuth");

const adminRouter = Router();
// admin routes
adminRouter.post("/signup", adminSignup);
adminRouter.post("/signin", adminSignin);
adminRouter.post("/promote/:id", adminAuth, promoteUser);

module.exports = adminRouter;
