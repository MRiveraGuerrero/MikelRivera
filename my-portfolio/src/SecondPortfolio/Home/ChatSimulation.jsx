import React, { useState, useEffect, useRef } from "react";
import "./ChatSimulation.css";

export default function ChatSimulation() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hola Mikel 👋 ¿sobre qué quieres charlar hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  // === FONDO MATRIX (0 y 1 naranja) ===
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const letters = "01".split("");
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f57c00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // === Envío de mensaje ===
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inputs: input }),
        }
      );
      const data = await response.json();
      const aiText =
        data?.generated_text ||
        data?.[0]?.generated_text ||
        "Lo siento, no pude generar una respuesta ahora.";
      setMessages((m) => [...m, { sender: "ai", text: aiText }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { sender: "ai", text: "Error al conectar con el modelo gratuito." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-background">
      {/* Lluvia binaria */}
      <canvas ref={canvasRef} className="chat-canvas" />

      <section className="chat-sim">
        <div className="chat-header">🗨️ Simulación de conversación</div>

        <div className="chat-window">
          <div className="avatar user-avatar" title="Tú (Mikel)">
            M
          </div>

          <div className="chat-area">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`bubble ${msg.sender === "user" ? "user" : "ai"}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="bubble ai">Escribiendo...</div>}
          </div>

          <div className="avatar ai-avatar" title="ChatGPT">
            🤖
          </div>
        </div>

        <form onSubmit={sendMessage} className="chat-input">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}
