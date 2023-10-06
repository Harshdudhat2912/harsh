const express = require("express");
const { Login, Register } = require("../controller/Controller");

const app = express();

app.post("/register/createAc", Register);
app.post("/login", Login);

module.exports = app