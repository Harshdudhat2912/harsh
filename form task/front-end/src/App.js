import React from 'react';
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreatePage from "./CreatePage/CreatePage";
import DashboardData from "./Dashboard/Dashboard";
import Loginpage from "./CreatePage/Loginpage";
import Note from "./Dashboard/Notes";


function App()
{
  const token = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={ <Navigate to="/createAc" /> } />
          <Route path="/createAc" element={ token ? <Navigate to="/dashbord" /> : <CreatePage /> } />
          <Route path="/login" element={ token ? <Navigate to="/dashbord" /> : <Loginpage /> } />

          <Route path="/dashbord" element={ !token ? <Navigate to="/login" /> : <DashboardData /> } />
          <Route path="/notes" element={ !token ? <Navigate to="/login" /> : <Note /> } />

          <Route path="*" element={ <NoPage /> } />

        </Routes>
      </BrowserRouter>
    </>);
}


const NoPage = () =>
{
  return <> <h1>404</h1></>
};


export default App;
