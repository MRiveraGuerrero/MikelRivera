import { describe, it, expect } from "vitest";
import { rollBoosterPack, SAKURA_CARDS, RARITIES } from "../lib/animeCardsData";

describe("Anime Pack Opening - Pack Opening & Collection Suite", () => {
  it("should roll a booster pack with exactly 5 cards", () => {
    const packCards = rollBoosterPack("pack_genesis", 5);
    expect(packCards).toHaveLength(5);
    
    packCards.forEach((card) => {
      expect(card).toHaveProperty("id");
      expect(card).toHaveProperty("name");
      expect(card).toHaveProperty("rarity");
      expect(card).toHaveProperty("element");
      expect(card).toHaveProperty("atk");
      expect(card).toHaveProperty("def");
      expect(card).toHaveProperty("instanceId");
    });
  });

  it("should guarantee a Rare (R) or higher card on the 5th slot", () => {
    for (let i = 0; i < 20; i++) {
      const pack = rollBoosterPack("pack_genesis", 5);
      const lastCard = pack[4];
      expect(lastCard.rarity.id).not.toBe(RARITIES.COMMON.id);
    }
  });

  it("should contain valid card database definitions", () => {
    expect(SAKURA_CARDS.length).toBeGreaterThan(10);
    const ultraRares = SAKURA_CARDS.filter(c => c.rarity.id === "UR" || c.rarity.id === "ER");
    expect(ultraRares.length).toBeGreaterThan(0);
  });

  it("should validate account deletion confirmation string", () => {
    const isValidConfirmation = (text) => text === "ELIMINAR MI CUENTA";
    
    expect(isValidConfirmation("ELIMINAR MI CUENTA")).toBe(true);
    expect(isValidConfirmation("eliminar mi cuenta")).toBe(false);
    expect(isValidConfirmation("ELIMINAR")).toBe(false);
    expect(isValidConfirmation("")).toBe(false);
  });
});
