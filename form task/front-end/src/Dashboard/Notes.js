import React, { useState } from "react";
import "./Dash.css";
import { Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

export default function Note()
{
  const path = useNavigate();
  const [ data, setData ] = useState({
    title: "",
    Discription: "",
  });
  const change = (e) =>
  {
    const { value, name } = e.target;
    setData((pre) =>
    {
      return {
        ...pre,
        [ name ]: value,
      };
    });
  };
  const click = async () =>
  {
    if (data.title.trim() === "" || data.Discription.trim() === "")
    {
      toast.error("Sorry 🤨 Enter Data");
      return;
    }

    try
    {
      await axios.post(`http://localhost:5252/note`, {
        title: data.title.trim(),
        Discription: data.Discription.trim(),
      });
    } catch (error)
    {
      console.log(error);
    }
    toast.success("data is created 😱");

    path("/dashboard");
    setData({
      title: "",
      Discription: "",
    });
  };
  return (
    <div className="main-box">
      <h1 className="hed">Create Your Notes</h1>
      <div className="main">
        <div className="input-main-box">
          <Grid container spacing={ 5 }>
            <Grid item xs={ 6 }>
              <h4>Title</h4>
              <br />
              <TextField
                className="inputfield"
                id="outlined-basic"
                label="Title"
                variant="outlined"
                onChange={ change }
                name="title"
                value={ data.title }
              />
            </Grid>
            <ToastContainer position="bottom-right" />

            <Grid item xs={ 6 }>
              <h4>Discription</h4> <br />
              <TextField
                id="outlined-basic"
                className="inputfield"
                label="Discription"
                variant="outlined"
                onChange={ change }
                name="Discription"
                value={ data.Discription }
              />
            </Grid>

            <Button variant="contained" className="button" onClick={ click }>
              Create
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
}
