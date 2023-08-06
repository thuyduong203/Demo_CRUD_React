// src/component/Slidebar.js
import React from "react";
import { Link, Router } from "react-router-dom";
import "./slidebarStyle.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Table from "./pages/Table";
import Test from "./pages/Test";
import Category from "./pages/Category";
import Product from "./pages/Product";
import SeatLayout from "./pages/SeatLayout";
export const Slidebar = () => {
  return (
    <BrowserRouter>
      <div className="slidebar-div">
        Day la slidebar
        <nav>
          <ul>
            <li>
              <Link to="/home">Trang chủ</Link>
            </li>
            <li>
              <Link to="/about">Giới thiệu</Link>
            </li>
            <li>
              <Link to="/table">Table</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/product">Product</Link>
            </li>
            <li>
              <Link to="/seat-layout">Seat layout</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        {/*Navigate: duong dan mac dinh khi chay chuong trinh  */}
        {/* Link to, element, Routers: <=> Switch, component */}
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/table" element={<Table />} />
        <Route path="/test" element={<Test />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/seat-layout" element={<SeatLayout />} />
      </Routes>
    </BrowserRouter>
  );
};
