const express = require("express");
const app = express();

const { get, post, delcontroll, putcontroll } = require("../controller/NoteController");

// const Authorization = async (req, res, next) =>
// {
//   const token = req.headers.authorization;
// console.log(">>>", token);
// if (token)
// {
  // const verifyToken = jwt.verify(token, "harsh");
  // console.log(">>>>..>>>>", verifyToken);

// } else
// {
  // console.error("Not Found Token!")
// }
//   next();
// };

app.get("/", get);
app.post("/", post);
app.delete("/:id", delcontroll);
app.put("/:id", putcontroll);

module.exports = app;
