import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import About from "./pages/About";
import styles from "./App.module.css"; // importa como objeto

export default function Portfolio1App() {
  return (
    <div className={styles.wrapper}>
      <ThemeProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}
