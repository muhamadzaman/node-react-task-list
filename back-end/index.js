require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieSession = require("express-session");
const passport = require("passport");
const apiRoute = require("./routes/api.route");
const { corsOptions } = require("./services/cors.service");
const app = express();
require("./passport.js");
//Middlesware
app.use(cors());

app.use(
  cookieSession({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === "production" ? "true" : "auto",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    resave: false,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(morgan("dev"));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1", apiRoute);
//Error Handling
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

const PORT = process.env.PORT || 8000;

//Run App at Port
app.listen(PORT, () => {
  console.log(`Backend Server is listening on ${PORT}`);
});
