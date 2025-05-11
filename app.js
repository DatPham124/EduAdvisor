const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ApiError = require("./app/utils/error.util");
const MajorRoute = require("./app/router/major.route");
const examGroupRoute = require("./app/router/examGroup.route");
const admissionInfoRoute = require("./app/router/admissionInfo.route");
const admissionTypeRoute = require("./app/router/admissionType.route");
const teacherRoute = require("./app/router/teacher.route");
const userRoute = require("./app/router/user.route");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URI.split(",").map((url) => url.trim()),
  })
);
console.log(
  `Allow CORS: ${process.env.CLIENT_URI.split(",").map((url) => url.trim())}`
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
// app.use('/uploads', express.static(`${__dirname}/uploads`));

//Use Routers
app.use("/api/eduadvisor/major", MajorRoute);
app.use("/api/eduadvisor/exam_group", examGroupRoute);
app.use("/api/eduadvisor/admission_type", admissionInfoRoute);
app.use("/api/eduadvisor/admission_type", admissionTypeRoute);
app.use("/api/eduadvisor/teacher", teacherRoute);
app.use("/api/eduadvisor/user", userRoute);

//Catch undefined routes
app.use((req, res, next) => {
  next(new ApiError(404, `Không tìm thấy đường dẫn ${req.originalUrl}`));
});

module.exports = app;
