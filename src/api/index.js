//https://blog.logrocket.com/build-rest-api-node-express-mysql/
// provides the server
const express = require("express");
const app = express();
const port = 3000;
const memberRouter = require("./routes/memberRoutes");
const ageDivisionRouter = require("./routes/age_divisionRoutes");
const doublesRouter = require("./routes/doubles");
const singlGameRouter = require("./routes/games_single");

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
app.use("/single_games", singlGameRouter);

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