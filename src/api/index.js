//https://blog.logrocket.com/build-rest-api-node-express-mysql/
// provides the server
const express = require("express");
const app = express();
const port = 3000;
const memberRouter = require("./routes/memberRoutes");
const ageDivisionRouter = require("./routes/age_divisionRoutes");
const doublesRouter = require("./routes/doubles");
const singleGameRouter = require("./routes/games_single");
const doublesGameRouter = require("./routes/games_doubles");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/member", memberRouter);
app.use("/age_division", ageDivisionRouter);
app.use("/doubles", doublesRouter);
app.use("/single_games", singleGameRouter);
app.use("/double_games", doublesGameRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});