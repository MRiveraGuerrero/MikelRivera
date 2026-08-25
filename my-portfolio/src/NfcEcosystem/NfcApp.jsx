import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NfcHomePage from "./pages/NfcHomePage";
import NfcStorePage from "./pages/NfcStorePage";
import NfcDashboardPage from "./pages/NfcDashboardPage";

export default function NfcApp() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<NfcHomePage cartCount={cartItems.length} onAddToCart={handleAddToCart} />}
      />
      <Route
        path="/store"
        element={<NfcStorePage cartCount={cartItems.length} onAddToCart={handleAddToCart} />}
      />
      <Route
        path="/dashboard"
        element={<NfcDashboardPage cartCount={cartItems.length} />}
      />
    </Routes>
  );
}
