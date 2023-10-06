import React, { useState } from "react";
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, } from "@mui/material";
import Button from "react-bootstrap/Button";
import img from "../images/google.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function CreatePage()
{
  const path = useNavigate();
  const [ allData, setAllData ] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const getData = (e) =>
  {
    const { name, value } = e.target;
    setAllData({ ...allData, [ name ]: value });
  };
  const handleConfirm = async () =>
  {
    if (
      allData.fname.trim() === "" ||
      allData.lname.trim() === "" ||
      allData.email.trim() === "" ||
      allData.password.trim() === ""
    )
    {
      toast.error("Fill empty Blanks");
      return;
    } else if (!/\S+@\S+\.\S+/.test(allData.email))
    {
      toast.error("Enter Valid email");
      return;
    }
    await axios
      .post("http://localhost:5252/loginform/register/createAc", allData)
      .then((res) => console.log(res.response));
    toast.success("Account Created , Successfully");
    setAllData({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
  };
  const [ showPassword, setShowPassword ] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <div>
      <div className="container">
        <div className="head">
          <h3>Create an Account</h3>
          <p className="arrange">
            or
            <button onClick={ () => path("/login") } className="sign-btn">
              sign in
            </button>
          </p>
        </div>
        <br />
        <div className="create-input-box">
          <Grid textAlign={ "center" } container spacing={ 4 }>
            <Grid item xs={ 6 }>
              <TextField
                id="outlined-basic"
                label="first name"
                variant="outlined"
                className="input"
                name="fname"
                onChange={ getData }
                value={ allData.fname }
              />
            </Grid>
            <Grid item xs={ 6 }>
              <TextField
                id="outlined-basic"
                label="last name"
                variant="outlined"
                className="input"
                name="lname"
                onChange={ getData }
                value={ allData.lname }
              />
            </Grid>
            <Grid item xs={ 6 }>
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                className="input"
                name="email"
                onChange={ getData }
                value={ allData.email }
              />
            </Grid>
            <Grid item xs={ 6 }>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  name="password"
                  style={ { width: "31vh" } }
                  onChange={ getData }
                  value={ allData.password }
                  id="outlined-adornment-password"
                  type={ showPassword ? "text" : "password" }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={ handleClickShowPassword }
                        edge="end"
                      >
                        { showPassword ? <Visibility /> : <VisibilityOff /> }
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={ 12 }>
              <Button className="google-btn" variant="dark">
                Join With <img src={ img } alt="google" /> Google
              </Button>
            </Grid>
            <Grid item xs={ 12 }>
              <Button
                onClick={ handleConfirm }
                variant="dark"
                className="create-btn"
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
