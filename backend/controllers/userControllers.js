const { z } = require("zod");
const { UserModel } = require("../model/userModel");
const { PurchaseModel } = require("../model/purchaseModel");
const { CourseModel } = require("../model/courseModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  //define zod schema for signup data
  const userInput = z
    .object({
      firstname: z.string().min(3).max(20),
      lastname: z.string().min(3).max(20),
      email: z.string().email(),
      password: z.string().min(8).max(50),
    })
    .strict();
  // Parse and validate input
  const parsedData = userInput.safeParse(req.body);

  //data not safe
  if (!parsedData.success) {
    return res.status(400).json({
      errors: parsedData.error.issues.map((err) => err.message),
    });
  }

  //data is safe for use
  try {
    const { firstname, lastname, email, password } = parsedData.data;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: firstname + " signed up successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

exports.userSignin = async (req, res) => {
  // Zod schema for signin
  const userInput = z
    .object({
      email: z.string().email(),
      password: z.string().min(8).max(50),
    })
    .strict();

  // Parse and validate input
  const parsedData = userInput.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      errors: parsedData.error.issues.map((err) => err.message),
    });
  }

  try {
    const { email, password } = parsedData.data;

    // Find user with this email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    // Sign JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: user.firstname + " signed in successfully.",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};
exports.purchaseCourse = async (req, res) => {
  const idSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),
  });

  const parsed = idSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.errors });
  }

  try {
    const { id } = parsed.data;

    // Check if course exists
    const purchasedCourse = await CourseModel.findById(id);
    if (!purchasedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Prevent duplicate purchase
    const alreadyPurchased = await PurchaseModel.findOne({
      userId: req.user._id,
      courseId: id,
    });

    if (alreadyPurchased) {
      return res.status(400).json({
        message: "You have already purchased this course.",
      });
    }

    // Create purchase record
    const purchase = await PurchaseModel.create({
      userId: req.user._id,
      courseId: id,
      price: purchasedCourse.price,
    });

    res.status(200).json({
      message: "Course purchased successfully.",
      course: purchasedCourse,
      purchase,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};
