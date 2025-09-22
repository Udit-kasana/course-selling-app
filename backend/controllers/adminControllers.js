const { z } = require("zod");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.adminSignup = async (req, res) => {
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
      role: "admin",
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

exports.adminSignin = async (req, res) => {
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

    //chaeck of user is admin or not
    if (user.role !== "admin") {
      return res.status(401).json({
        message: "Access denied",
      });
    }

    // Sign JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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

exports.promoteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Update role to 'admin'
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: `${updatedUser.firstname} is now an admin.`,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
