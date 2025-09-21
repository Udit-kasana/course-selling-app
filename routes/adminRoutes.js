const express = require("express");
const router = express.Router();

//routes
router.post("/signup", (req, res) => {});
router.post("/login", (req, res) => {});
router.post("/create-course", (req, res) => {});
router.post("/add-course-content", (req, res) => {});
router.delete("/delete-course", (req, res) => {});

module.exports = router;
