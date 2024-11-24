import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductsList from "./components/products/ProductsList";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/products" element={<ProductsList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
