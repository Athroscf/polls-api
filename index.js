const express = require("express");
require("./config/db");
const bodyParser = require("body-parser");
const passport = require("passport");
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

app.use(passport.initialize());
app.use(passport.session());

// require('./config/passport')(passport);

app.use("/", routes());

app.listen(process.env.PORT);