import React from "react";
import NfcHeader from "../components/NfcHeader";
import NfcHero from "../components/NfcHero";
import NfcStoreSection from "../components/NfcStoreSection";
import NfcDashboardSection from "../components/NfcDashboardSection";
import NfcFooter from "../components/NfcFooter";

export default function NfcHomePage({ cartCount = 0, onAddToCart }) {
  return (
    <div style={{ background: "#06070c", minHeight: "100vh", color: "#ffffff" }}>
      <NfcHeader cartCount={cartCount} />
      <main>
        <NfcHero />
        <NfcStoreSection onAddToCart={onAddToCart} />
        <NfcDashboardSection />
      </main>
      <NfcFooter />
    </div>
  );
}
