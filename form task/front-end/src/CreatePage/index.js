import React, { useState } from "react";
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, } from "@mui/material";
import Button from "react-bootstrap/Button";
import img from "../images/google.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../App.css";

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
    }
    await axios.post("http://localhost:5252/create", allData);
    toast.success("Account Created , Successfully");
    setAllData({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
  };
  const handleEnterKeyPress = (e) =>
  {
    if (e.key === "Enter")
    {
      handleConfirm();
    }
  };
  const [ showPassword, setShowPassword ] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) =>
  {
    event.preventDefault();
  };
  return (
    <div>
      <div className="container">
        <div className="head">
          <h2>Create an Account</h2>
          <p className="arrange">
            or{ " " }
            <button onClick={ () => path("/login") } className="sign-btn">
              sign in
            </button>{ " " }
          </p>
        </div>
        <br />
        <div className="create-input-box">
          <Grid textAlign={ "center" } container spacing={ 4 }>
            <Grid item xs={ 6 }>
              <TextField
                id="outlined-basic"
                label="First name"
                variant="standard"
                className="input"
                name="fname"
                onChange={ getData }
                value={ allData.fname }
                onKeyPress={ handleEnterKeyPress }
              />
            </Grid>
            <Grid item xs={ 6 }>
              <TextField
                id="outlined-basic"
                label="Last name"
                variant="standard"
                className="input"
                name="lname"
                onChange={ getData }
                value={ allData.lname }
                onKeyPress={ handleEnterKeyPress }
              />
            </Grid>
            <Grid item xs={ 6 }>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="standard"
                className="input"
                name="email"
                onChange={ getData }
                value={ allData.email }
                onKeyPress={ handleEnterKeyPress }
              />
            </Grid>
            <Grid item xs={ 6 }>
              <FormControl sx={ { m: 0, width: "50vh" } } variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  // onChange={Click2}
                  name="password"
                  onChange={ getData }
                  onKeyPress={ handleEnterKeyPress }
                  value={ allData.password }
                  className="main-box-size"
                  type={ showPassword ? "text" : "password" }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={ handleClickShowPassword }
                        onMouseDown={ handleMouseDownPassword }
                      >
                        { showPassword ? <Visibility /> : <VisibilityOff /> }
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={ 12 }>
              <div style={ { width: "100%" } }>or</div>
            </Grid>
            <Grid item xs={ 12 }>
              <Button className="google-btn">
                <img src={ img } alt="" />Join With Google
              </Button>
            </Grid>
            <Grid item xs={ 12 }>
              <Button
                onClick={ handleConfirm }
                variant="primary"
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
