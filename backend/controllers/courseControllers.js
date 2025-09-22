const { CourseModel } = require("../model/courseModel");
const { z } = require("zod");

exports.createCourse = async (req, res) => {
  const userInput = z
    .object({
      title: z.string().min(3),
      description: z.string().min(3),
      price: z.number(),
      imgurl: z.string().optional(),
    })
    .strict();

  const parsedData = userInput.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      errors: parsedData.error.issues.map((err) => err.message),
    });
  }

  try {
    const { title, description, price, imgurl } = parsedData.data;

    await CourseModel.create({
      title,
      description,
      price,
      imgurl:
        imgurl || "https://via.placeholder.com/400x200.png?text=Course+Image",
      userId: user._id,
    });

    res.status(201).json({
      message: `${title} course created successfully.`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};
exports.addCourseContent = () => {};
exports.updateCourseContent = () => {};
exports.deleteCourse = () => {};
