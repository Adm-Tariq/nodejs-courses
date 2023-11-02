const { validationResult } = require("express-validator");
const Course = require("../models/course.model.js");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper.js");
const appError = require("../utils/appError");

const getAllCourses = asyncWrapper( async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
})

const getCourse = asyncWrapper(async (req, res, next) => {
  let course = await Course.findById(req.params.id, { __v: false });
  if (!course) {
    const error = appError.create("not found course", 404, httpStatusText.FAIL);
    return next(error);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const updateCourse = await Course.findByIdAndUpdate(id, { $set: { ...req.body }});
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { course: updateCourse } });
});

const deleteCourse = async (req, res) => {
  const id = req.params.id;
  await Course.deleteOne({ _id: id });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: "null" });
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
