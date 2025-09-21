const express = require("express");
const router = express.Router();

//routes
router.post("/signup", (req, res) => {});
router.post("/login", (req, res) => {});
router.post("/purchase-course", (req, res) => {});
router.get("/all-courses", (req, res) => {});
router.get("/purchased-courses", (req, res) => {});

module.exports = router;
