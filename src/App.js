import React from "react";
import "./App.css";
import { Header } from "./component/Header";
import { Slidebar } from "./component/Slidebar";
import { Footer } from "./component/Footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Table from "./component/pages/Table";

function App() {
  return (
    <div>
      <Header />
      <Slidebar />
      <Footer />
    </div>
  );
}

export default App;
