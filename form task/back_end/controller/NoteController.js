const NoteUser = require("../model/Notemodal");
const jwt = require("jsonwebtoken");

const post = async (req, res) =>
{
  try
  {
    const user = new NoteUser(req.body);
    const result = await user.save();
    res.status(201).json({ result });
  } catch (error)
  {
    console.error(error);
  }
};

const get = async (req, res) =>
{
  try
  {
    const userData = await NoteUser.find();
    res.status(200).json(userData);

    const token = req.headers.authorization;
    console.log(">>>", token);
    if (token)
    {
      const ver = jwt.verify(token, "harsh");
      console.log(ver);
    }
    else
    {
      console.error("Not Found Token!")
    }
  } catch (error)
  {
    console.error("err", error);
  }
};
const putcontroll = async (req, res) =>
{
  try
  {
    const { id } = req.params;
    const result = await NoteUser.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(result);
  } catch (error)
  {
    console.error(error);
  }
};
const delcontroll = async (req, res) =>
{
  try
  {
    const { id } = req.params;
    const result = await NoteUser.findByIdAndDelete(id);
    res.status(201).json(result);
  } catch (error)
  {
    console.error(error);
  }
};

module.exports = { get, post, delcontroll, putcontroll };
