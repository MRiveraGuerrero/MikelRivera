import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./EasterEggModal.css";

const PETS = [
  { name: "Zorrito", img: "/assets/pets/fox.svg" },
  { name: "Pajarito", img: "/assets/pets/bird.svg" },
  { name: "Ranita", img: "/assets/pets/frog.svg" },
  { name: "Gatito", img: "/assets/pets/cat.svg" },
  { name: "Pulpo", img: "/assets/pets/octopus.svg" },
];

export default function EasterEggModal({ show, onClose, onHatch }) {
  const [stage, setStage] = useState("egg");
  const [pet, setPet] = useState(null);

  const handleCrack = () => {
    if (stage === "egg") {
      setStage("cracking");
      setTimeout(() => {
        const randomPet = PETS[Math.floor(Math.random() * PETS.length)];
        setPet(randomPet);
        setStage("hatched");
      }, 1600);
    } else if (stage === "hatched") {
      onHatch(pet);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="egg-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="egg-shell"
            onClick={(e) => {
              e.stopPropagation();
              handleCrack();
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {stage === "egg" && (
              <motion.img
                src="/assets/egg/egg_whole.svg"
                alt="Egg"
                className="egg-img"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}

            {stage === "cracking" && (
              <motion.img
                src="/assets/egg/egg_crack.svg"
                alt="Cracking Egg"
                className="egg-img"
                initial={{ scale: 1 }}
                animate={{ scale: [1.05, 1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 1.5 }}
              />
            )}

            {stage === "hatched" && pet && (
              <motion.div
                className="pet-appear"
                initial={{ scale: 0, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <img src={pet.img} alt={pet.name} className="pet-img" />
                <p className="pet-name">{pet.name} ha nacido 🎉</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
