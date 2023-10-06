const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Discription: {
    type: String,
    required: true,
  },
});

const NoteUser = mongoose.model("NoteData", UserSchema);
module.exports = NoteUser;
