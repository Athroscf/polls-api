const express = require("express");
require("./config/db");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require("cors");

require("dotenv").config({
    path: "variables.env"
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/", routes());

app.listen(process.env.PORT);