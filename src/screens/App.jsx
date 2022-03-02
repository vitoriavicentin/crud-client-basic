import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Form";
import "../styles/globalStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Consult from "./Consult";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route index path="/Form" element={<Form />}></Route>
          <Route index path="/Consult" element={<Consult />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
