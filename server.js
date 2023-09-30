const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
