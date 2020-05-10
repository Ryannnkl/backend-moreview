const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const routes = require("./src/routes");

const app = express();

mongoose.connect(
  "mongodb+srv://ryannqwe:19735@ryanncluster-jntrn.mongodb.net/moreview-dev?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/files", express.static(path.resolve(__dirname, "uploads")));

app.listen(3333);
