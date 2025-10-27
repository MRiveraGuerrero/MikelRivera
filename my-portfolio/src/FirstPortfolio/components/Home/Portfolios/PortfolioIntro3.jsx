// src/components/Home/PortfolioIntro2.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import "../../../styles/PortfolioIntro.css";
import { useLanguage } from '../../../contexts/LanguageContext';

const INTRO_TITLE = "Flappy Bird Clone";
const INTRO_DESCRIPTION_KEY = "portfolioGrid.project2_description";

export default function PortfolioIntro2() {
  const canvasRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    let birdY = 150;
    let velocity = 0;
    const gravity = 0.35;
    const lift = -7;
  
    const pipes = [];
    const pipeWidth = 50;
    const pipeGap = 350;
    let frame = 0;
  
    function jump() {
      velocity = lift;
    }
  
    function resetGame() {
      birdY = 150;
      velocity = 0;
      pipes.length = 0;
      frame = 0;
    }
  
    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      velocity += gravity;
      birdY += velocity;
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(80, birdY, 15, 0, Math.PI * 2);
      ctx.fill();
  
      if (frame % 90 === 0) {
        const top = Math.random() * 200 + 20;
        pipes.push({ x: canvas.width, top });
      }
  
      pipes.forEach((pipe, index) => {
        pipe.x -= 2;
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
  
        if (
          80 + 15 > pipe.x && 80 - 15 < pipe.x + pipeWidth &&
          (birdY - 15 < pipe.top || birdY + 15 > pipe.top + pipeGap)
        ) {
          resetGame();
        }
  
        if (pipe.x + pipeWidth < 0) pipes.splice(index, 1);
      });
  
      if (birdY > canvas.height || birdY < 0) resetGame();
  
      frame++;
      requestAnimationFrame(draw);
    }
  
    // Inicializar todo
    window.addEventListener("keydown", jump);
    window.addEventListener("click", jump);
    window.addEventListener("touchstart", jump);
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw(); // ✅ LLAMAR AQUÍ
  
    return () => {
      window.removeEventListener("keydown", jump);
      window.removeEventListener("click", jump);
      window.removeEventListener("touchstart", jump);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="portfolio-container">
      <div className="flappy-wrapper">
        <canvas ref={canvasRef} className="flappy-canvas" />
        <motion.div
          className="intro-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
        </motion.div>
      </div>
    </div>
  );
}
