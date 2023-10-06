const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const user = require("./Router/Router");
const usernote = require("./Router/NoteRouter");
const { default: mongoose } = require("mongoose");

const PORT = 5252;

app.use("/loginform", user);
app.use("/note", usernote);

mongoose.connect("mongodb://127.0.0.1:27017/LoginData").then(() => {
  console.log("Database connected ....!");
});

app.listen(PORT, () => {
  console.log(`Server start successfully ${PORT}`);
});
