const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
});

const User = mongoose.model("accounttable", UserSchema);
module.exports = User;
