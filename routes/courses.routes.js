const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const courseController = require("../controller/courses.controller");
const verifyToken = require("../middleware/verifyToken");
const userRole = require("../utils/user-roles");
const allowedTo = require("../middleware/allowedTo");

//  middleware validation
const validationArray = [
  body("title")
    .notEmpty()
    .withMessage("name is empty")
    .isLength({ min: 2 })
    .withMessage("name at least is 2 chars"),

  body("price").notEmpty().withMessage("price is empty"),
];

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(validationArray, courseController.addCourse);

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(verifyToken, allowedTo(userRole.ADMIN,userRole.MANGER),courseController.deleteCourse);

module.exports = router;
