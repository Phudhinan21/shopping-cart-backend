const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const sequelize = require("./util/db");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
