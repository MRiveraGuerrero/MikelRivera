import React from "react";

export default function SVGCardGraphic({ theme, rarity }) {
  const isHolo = rarity === "ER" || rarity === "UR";

  return (
    <svg viewBox="0 0 200 160" width="100%" height="100%" style={{ borderRadius: "8px", overflow: "hidden" }}>
      <defs>
        <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2a75" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#ffd700" stopOpacity="0.8" />
          <stop offset="65%" stopColor="#00f0ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <rect width="200" height="160" fill="url(#bgGrad)" />

      {isHolo && (
        <rect width="200" height="160" fill="url(#holoGradient)" opacity="0.25" style={{ mixBlendMode: "color-dodge" }} />
      )}

      <circle cx="30" cy="30" r="1.5" fill="#ffffff" opacity="0.6" />
      <circle cx="170" cy="40" r="1" fill="#ffffff" opacity="0.7" />
      <circle cx="150" cy="130" r="2" fill="#ffd700" opacity="0.8" />
      <circle cx="40" cy="120" r="1.5" fill="#ff2a75" opacity="0.7" />

      {theme === "kaguya" && (
        <g filter="url(#glow)">
          <circle cx="100" cy="80" r="48" fill="#ff2a75" opacity="0.2" />
          <path d="M100 25 L120 70 L165 70 L130 95 L145 140 L100 110 L55 140 L70 95 L35 70 L80 70 Z" fill="#ffd700" opacity="0.85" />
          <circle cx="100" cy="80" r="25" fill="#ffffff" />
          <path d="M90 65 Q100 45 110 65 L105 95 L95 95 Z" fill="#ff2a75" />
        </g>
      )}

      {theme === "renzo" && (
        <g filter="url(#glow)">
          <circle cx="100" cy="80" r="50" fill="#a855f7" opacity="0.3" />
          <path d="M70 40 L130 40 L150 90 L100 140 L50 90 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
          <circle cx="100" cy="80" r="18" fill="#000000" stroke="#00f0ff" strokeWidth="2" />
          <polygon points="100,50 110,75 135,80 110,85 100,110 90,85 65,80 90,75" fill="#a855f7" opacity="0.7" />
        </g>
      )}

      {theme === "valkiria" && (
        <g filter="url(#glow)">
          <ellipse cx="100" cy="80" rx="45" ry="40" fill="#ff2a75" opacity="0.3" />
          <path d="M100 30 C120 50 130 70 100 130 C70 70 80 50 100 30 Z" fill="#ff5e97" />
          <path d="M50 80 C70 100 90 110 150 80 C90 50 70 60 50 80 Z" fill="#ff2a75" opacity="0.8" />
          <circle cx="100" cy="80" r="12" fill="#ffd700" />
        </g>
      )}

      {theme === "nox" && (
        <g filter="url(#glow)">
          <path d="M40 120 Q100 20 160 120 Q100 150 40 120 Z" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="3" />
          <circle cx="100" cy="75" r="28" fill="#030712" stroke="#ec4899" strokeWidth="2" />
          <polygon points="100,35 108,65 138,75 108,85 100,115 92,85 62,75 92,65" fill="#ec4899" />
        </g>
      )}

      {!["kaguya", "renzo", "valkiria", "nox"].includes(theme) && (
        <g filter="url(#glow)">
          <circle cx="100" cy="80" r="38" fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="4,4" />
          <polygon points="100,45 125,80 100,115 75,80" fill="#00f0ff" opacity="0.6" />
          <circle cx="100" cy="80" r="14" fill="#ffd700" />
        </g>
      )}

      <rect x="2" y="2" width="196" height="156" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="6" />
    </svg>
  );
}
