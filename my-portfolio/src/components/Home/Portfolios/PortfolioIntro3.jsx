// src/components/Home/PortfolioIntro2.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import "../../../styles/PortfolioIntro.css";
import { useLanguage } from '../../contexts/LanguageContext';

const INTRO_TITLE = "Flappy Bird Clone";
const INTRO_DESCRIPTION_KEY = "portfolioGrid.project2_description";

export default function PortfolioIntro2() {
  const canvasRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Ajustar tamaño
    canvas.width = 1080;
    canvas.height = 720;

    // Bird
    let birdY = 150;
    let velocity = 0;
    const gravity = 0.35;
    const lift = -7;

    // Tubos
    const pipes = [];
    const pipeWidth = 50;
    const pipeGap = 350;
    let frame = 0;

    // Eventos
    function jump() {
      velocity = lift;
    }
    window.addEventListener("keydown", jump);
    window.addEventListener("click", jump);
    window.addEventListener("touchstart", jump); // Para móviles

    // Bucle principal
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Bird
      velocity += gravity;
      birdY += velocity;
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(80, birdY, 15, 0, Math.PI * 2);
      ctx.fill();

      // Pipes
      if (frame % 90 === 0) {
        const top = Math.random() * 200 + 20;
        pipes.push({ x: canvas.width, top });
      }

      pipes.forEach((pipe, index) => {
        pipe.x -= 2;

        // Top pipe
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);

        // Bird collision
        if (
          80 + 15 > pipe.x && 80 - 15 < pipe.x + pipeWidth &&
          (birdY - 15 < pipe.top || birdY + 15 > pipe.top + pipeGap)
        ) {
          resetGame();
        }

        // Remove off-screen pipes
        if (pipe.x + pipeWidth < 0) pipes.splice(index, 1);
      });

      // Game over if bird falls
      if (birdY > canvas.height || birdY < 0) resetGame();

      frame++;
      requestAnimationFrame(draw);
    }

    function resetGame() {
      birdY = 150;
      velocity = 0;
      pipes.length = 0;
      frame = 0;
    }

    draw();

    return () => {
      window.removeEventListener("keydown", jump);
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
