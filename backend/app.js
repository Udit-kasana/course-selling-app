const express = require(`express`);
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

module.exports = app;
