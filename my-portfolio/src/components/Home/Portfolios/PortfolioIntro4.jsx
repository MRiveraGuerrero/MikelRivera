// src/components/Home/PortfolioIntro1.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useFBX, Html, useTexture } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import "../../../styles/PortfolioIntro.css";
import { useLanguage } from '../../contexts/LanguageContext';

const MODEL_PATH = "/models/stylised-spaceship/source/ship.fbx";
const TEXTURE_PATH = "/models/stylised-spaceship/source/z.png";
const INTRO_TITLE = "Mikel Rivera";
const INTRO_ROLE_KEY = "portfolioIntro.developerRole";

export default function PortfolioIntro4() {
  const { t } = useLanguage();
  return (
    <div className="portfolio-container">
      <Canvas /* ... */>
        <Suspense fallback={<Html center><span style={{color: 'white'}}>{t('portfolioIntro.loadingModel')}</span></Html>}>
          <Model modelPath={MODEL_PATH} texturePath={TEXTURE_PATH}/>
        </Suspense>
        <OrbitControls /* ... */ />
      </Canvas>
      <motion.div /* ... */>
        <h1 className="portfolio-intro">{INTRO_TITLE}</h1>
        <p className="into-title">{t(INTRO_ROLE_KEY)}</p>
      </motion.div>
    </div>
  );
}