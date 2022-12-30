const express = require("express");
const morgan = require("morgan");
const mainRoutes = require("./routes/index.Routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { FRONT_END_URL } = process.env;
require("./config/database.js");

const app = express();

// app.name = "API";

app.use((req, res, next) => {
  console.log(`Request received at ${req.path}`)
  next();
})
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    credentials: true,
  })
);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", FRONT_END_URL);
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

app.use("/api", mainRoutes);

app.get("/get-cookie", (req, res) => {
  res.cookie("token", "123123");

  return res.send({ msg: "cookie establecida" });
});

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
