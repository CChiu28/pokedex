import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import TeamBuilder from './Components/TeamBuilder';
import NavBar from "./Components/Nav";
import Login from "./Components/Login";
import { LoginToDB } from "./Utils.js";

export default function RouteSwitch(props) {
    function getLogin(info) {
        LoginToDB(info);
    }
    return(
        <BrowserRouter>
            <NavBar getLogin={getLogin} />
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/teambuilder' element={<TeamBuilder />} />
                {/* <Route path='/login' element={<Login onLogin={getLogin}/>} /> */}
            </Routes>
        </BrowserRouter>
    )
}