const user = require("../model/model");
const jwt = require("jsonwebtoken");

const Register = async (req, res, next) =>
{
  try
  {
    const oldData = await user.findOne({ email: req.body.email });
    if (oldData)
    {
      return res.status(400).json({ msg: "enter onther email" });
    }
    const { password, email, fname, lname } = req.body;
    // const salt = await bcrypt.genSalt(10);
    // const hashedpasssword = await bcrypt.hash(password, salt);
    const newUser = new user({ fname, lname, email, password });
    const result = await newUser.save();
    res.status(201).json({ result });
  } catch (error)
  {
    console.error(error);
  }
};

const Login = async (req, res) =>
{
  const { email, password } = req.body;
  const users = await user.findOne({ email });
  try
  {
    if (!users)
    {
      console.error("email is not registered.");
      res.status(203).json({ msg: "Email is not registered." });
    } else
    {
      if (password !== users.password)
      {
        console.error("entered incorrect password");
      } else
      {
        var token = jwt.sign({ email }, "harsh");
        res.status(200).json({ token });
      }
    }
  } catch (error)
  {
    console.error(error);
  }
};

module.exports = { Register, Login };
