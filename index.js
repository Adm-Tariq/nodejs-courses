const express = require("express");
var cors = require("cors");
require("dotenv").config();
const path = require('path')
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");


const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json());
app.use(cors());
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
});

const coursesRoute = require("./routes/courses.routes");
const usersRoute = require('./routes/user.routes')
app.use("/api/courses", coursesRoute);
app.use("/api/users", usersRoute)

// global middleware for not found router
app.all("*", (req, res) => {
  res.status(404).json({
    status: httpStatusText.ERROR, message: "this resource is not available",
  });
});

// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.httpStatusText,
    data: null,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
