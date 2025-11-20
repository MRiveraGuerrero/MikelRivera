import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./ChatSimulation.module.css";

const defaultSuggestions = [
  "¿Qué proyectos has desarrollado?",
  "¿Qué tecnologías dominas?",
  "Cuéntame sobre tu experiencia",
];

const normalize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9ñ\s]/g, "")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const knowledgeBase = [
  {
    intent: "intro",
    keywords: ["hola", "presentate", "quien", "eres", "conocerte", "sobre ti"],
    response: ({ timeOfDay }) =>
      `¡${timeOfDay}! Soy un chatbot diseñado por Mikel Rivera para presentarte su perfil tecnológico. Puedo contarte sobre sus proyectos, experiencia, stack favorito o incluso darte recomendaciones para colaborar.`,
    suggestions: [
      "¿Qué hace especial a tu trabajo?",
      "¿Cuál es tu stack principal?",
      "Muéstrame tu experiencia reciente",
    ],
  },
  {
    intent: "stack",
    keywords: ["stack", "tecnologias", "tecnologia", "tech", "frontend", "backend"],
    response: () =>
      "El stack principal de Mikel combina React, TypeScript, Node.js y arquitectura serverless sobre plataformas como AWS y Vercel. También domina herramientas de testing (Vitest, Playwright) y automatización CI/CD para entregar productos fiables.",
    suggestions: [
      "¿Y en el backend qué usas?",
      "¿Cómo aseguras la calidad?",
      "¿Puedes recomendar una librería?",
    ],
  },
  {
    intent: "backend",
    keywords: ["backend", "node", "api", "servidor", "infraestructura"],
    response: () =>
      "Para el backend suele construir APIs con Node.js y NestJS, orquestando servicios en la nube con AWS Lambda, DynamoDB y supabase cuando se necesita persistencia rápida. Todo acompañado de monitoreo y alertas para prevenir incidentes.",
    suggestions: [
      "¿Qué proyecto aplica esto?",
      "¿Usas microservicios?",
      "¿Cómo manejas la seguridad?",
    ],
  },
  {
    intent: "projects",
    keywords: ["proyectos", "portfolio", "trabajos", "ejemplos", "casos"],
    response: () =>
      "Algunos proyectos destacados: un sistema de reservas en tiempo real con Next.js y websockets, dashboards analíticos con React + D3 y una plataforma educativa gamificada. Cada proyecto prioriza experiencia de usuario, rendimiento y métricas medibles.",
    suggestions: [
      "¿Cómo impactaron esos proyectos?",
      "Muéstrame resultados cuantitativos",
      "¿Tienes un proyecto open source?",
    ],
  },
  {
    intent: "experience",
    keywords: ["experiencia", "trayectoria", "trabajado", "empleos", "cv"],
    response: () =>
      "Cuenta con experiencia liderando equipos ágiles, definiendo roadmaps técnicos y entregando productos escalables. Ha colaborado con startups y compañías establecidas, siempre con foco en impacto de negocio y UX.",
    suggestions: [
      "¿Qué responsabilidades asumiste?",
      "¿Cómo gestionas al equipo?",
      "¿Qué aprendiste de tu último rol?",
    ],
  },
  {
    intent: "quality",
    keywords: ["calidad", "testing", "tests", "automatizacion", "metodologia"],
    response: () =>
      "La calidad es clave: integra tests unitarios y de integración, pipelines de CI/CD y monitoreo constante. Además, establece estándares de código y pair programming para acelerar el aprendizaje del equipo.",
    suggestions: [
      "¿Cómo diseñas un pipeline de CI?",
      "¿Qué herramientas recomiendas para testing?",
      "¿Cómo manejas releases?",
    ],
  },
  {
    intent: "collaboration",
    keywords: ["colaborar", "trabajar", "contratar", "equipo", "contactar", "contacto"],
    response: () =>
      "Si quieres colaborar, puedes escribir a hola@mikelrivera.dev o conectar vía LinkedIn. Le encanta co-crear productos con propósito y equipos con mentalidad de crecimiento.",
    suggestions: [
      "¿Cuál es tu disponibilidad?",
      "¿Trabajas en remoto?",
      "¿Puedes ayudar con consultoría?",
    ],
  },
  {
    intent: "personality",
    keywords: ["hobbies", "gusto", "personal", "libre", "tiempo", "música", "videojuegos"],
    response: () =>
      "Cuando se desconecta, Mikel disfruta crear música electrónica, explorar videojuegos indies y experimentar con visuales generativos. Esos hobbies inspiran soluciones creativas en sus proyectos.",
    suggestions: [
      "¿Algún videojuego favorito?",
      "¿Cómo conectas hobbies y trabajo?",
      "¿Qué te inspira a diario?",
    ],
  },
  {
    intent: "gratitude",
    keywords: ["gracias", "genial", "perfecto", "excelente", "aprecio"],
    response: () =>
      "¡Gracias a ti! Si necesitas profundizar en algún tema o quieres una demo más técnica, solo dilo y te comparto detalles.",
    suggestions: [
      "Muéstrame documentación",
      "¿Puedes resumir mis puntos clave?",
      "¿Qué paso debería seguir ahora?",
    ],
  },
  {
    intent: "followup",
    keywords: ["mas", "detalles", "cuentame", "profundiza", "ampliar"],
    response: ({ lastTopic }) =>
      lastTopic
        ? `¡Vamos más allá! Sobre ${lastTopic}, puedo darte métricas, herramientas utilizadas y los retos que resolvimos. ¿Qué aspecto te interesa: impacto, stack o proceso?`
        : "Claro, dime en qué tema quieres que profundicemos y preparo más contexto al instante.",
    suggestions: [
      "Impacto medible",
      "Stack utilizado",
      "Proceso y aprendizajes",
    ],
  },
];

export default function ChatSimulation() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hola, soy el copiloto virtual de Mikel Rivera. Pregúntame lo que quieras y te guío por su universo tech ✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(defaultSuggestions);
  const [lastTopic, setLastTopic] = useState(null);
  const canvasRef = useRef(null);
  const chatAreaRef = useRef(null);
  const historyRef = useRef([
    { role: "assistant", content: messages[0].text },
  ]);

  const timeOfDay = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 19) return "Buenas tardes";
    return "Buenas noches";
  }, []);

  // Fondo animado estilo Matrix naranja
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
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f57c00";
      ctx.font = `${fontSize}px 'Source Code Pro', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 60);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const enrichResponse = (intent, response) => {
    if (!intent) return response;
    setLastTopic(intent);
    return response;
  };

  const buildKnowledgeResponse = (userText) => {
    const normalized = normalize(userText);
    let bestMatch = null;

    knowledgeBase.forEach((item) => {
      const hits = item.keywords.filter((kw) => normalized.includes(kw));
      if (hits.length === 0) return;
      const score = hits.length / item.keywords.length;
      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { ...item, score, hits };
      }
    });

    if (!bestMatch) return null;

    const responseText =
      typeof bestMatch.response === "function"
        ? bestMatch.response({
          history: historyRef.current,
          lastTopic,
          timeOfDay,
        })
        : bestMatch.response;

    setSuggestions(bestMatch.suggestions || defaultSuggestions);
    enrichResponse(bestMatch.intent, responseText);
    return responseText;
  };

  const requestDialoGPT = async (prompt) => {
    try {
      const payload = {
        inputs: {
          past_user_inputs: historyRef.current
            .filter((entry) => entry.role === "user")
            .map((entry) => entry.content),
          generated_responses: historyRef.current
            .filter((entry) => entry.role === "assistant")
            .map((entry) => entry.content),
          text: prompt,
        },
      };

      const response = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      const aiText =
        data?.generated_text ||
        data?.[0]?.generated_text ||
        "Por ahora no tengo una respuesta precisa, pero puedo contarte más sobre mis proyectos o stack.";
      setSuggestions(defaultSuggestions);
      return aiText;
    } catch (err) {
      setSuggestions([
        "Recuérdame tu stack",
        "Dame recomendaciones",
        "¿Podemos agendar una llamada?",
      ]);
      return "Tuvimos un pequeño problema con el servicio externo. Sigamos conversando aquí mismo, ¿qué más te gustaría saber?";
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const trimmed = input.trim();
    const userMsg = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    historyRef.current.push({ role: "user", content: trimmed });

    const knowledgeResponse = buildKnowledgeResponse(trimmed);
    const aiReply =
      knowledgeResponse ||
      (await requestDialoGPT(trimmed)) ||
      "Aún estoy aprendiendo sobre ese tema, pero puedo compartirte proyectos, experiencias o cómo trabajo con los equipos.";

    const aiMsg = { sender: "ai", text: aiReply };

    setTimeout(() => {
      setMessages((prev) => [...prev, aiMsg]);
      historyRef.current.push({ role: "assistant", content: aiReply });
      setLoading(false);
    }, knowledgeResponse ? 400 : 850);
  };

  const handleSuggestion = (prompt) => {
    setInput(prompt);
  };

  return (
    <div className={styles["chat-background"]}>
      <canvas ref={canvasRef} className={styles["chat-canvas"]} />

      <section className={styles["chat-sim"]}>
        <header className={styles["chat-header"]}>
          <div>
            <h3>Copiloto de Mikel Rivera</h3>
            <p>
              Conversa conmigo para descubrir habilidades, proyectos y cómo podemos colaborar.
            </p>
          </div>
          <div className={styles["status-pill"]} aria-live="polite">
            <span className={styles["status-dot"]} /> En línea
          </div>
        </header>

        <div className={styles["chat-window"]}>
          <div className={styles["chat-avatars"]}>
            <div className={`${styles["avatar"]} ${styles["user-avatar"]}`} title="Tú">Tú</div>
            <div className={`${styles["avatar"]} ${styles["ai-avatar"]}`} title="Copiloto">🤖</div>
          </div>

          <div className={styles["chat-area"]} ref={chatAreaRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles["bubble"]} ${styles[msg.sender]}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className={`${styles["bubble"]} ${styles["ai"]} ${styles["typing"]}`}>Escribiendo...</div>}
          </div>
        </div>

        {suggestions?.length > 0 && (
          <div className={styles["chat-suggestions"]}>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className={styles["suggestion-chip"]}
                onClick={() => handleSuggestion(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={sendMessage} className={styles["chat-input"]}>
          <input
            type="text"
            placeholder="Escribe tu mensaje o selecciona una sugerencia..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "..." : "Enviar"}
          </button>
        </form>
      </section>
    </div>
  );
}
