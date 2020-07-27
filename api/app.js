/* --- IMPORTS --- */
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const companyRouter = require("./routes/company");
const animalRouter = require("./routes/animal");
const bodyParser = require("body-parser");

const chalk = require("chalk");
/* --- END IMPORTS --- */

const app = express();

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, _id, x-access-token, x-refresh-token");
  next();
});

app.use(bodyParser.json())
app.use(userRouter);
app.use(companyRouter);
app.use(animalRouter);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(chalk.blue("Connected to the MongoDB database successfully"));
  });

app.listen(PORT, () => {
  console.log(chalk.blue(`Server is listening on port: ${PORT}`));
});
