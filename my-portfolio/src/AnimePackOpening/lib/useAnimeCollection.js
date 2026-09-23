import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { rollBoosterPack, SAKURA_CARDS } from "./animeCardsData";

const LOCAL_STORAGE_KEY = "anime_pack_opening_user_collection";
const LOCAL_STORAGE_PACKS_KEY = "anime_pack_opening_user_packs";
const LOCAL_STORAGE_ESSENCE_KEY = "anime_pack_opening_user_essence";

export function useAnimeCollection() {
  const [user, setUser] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [collection, setCollection] = useState([]);
  const [packsAvailable, setPacksAvailable] = useState(3);
  const [essence, setEssence] = useState(150);
  const [isOpeningPack, setIsOpeningPack] = useState(false);
  const [openedCards, setOpenedCards] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    try {
      const storedCol = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedCol) {
        setCollection(JSON.parse(storedCol));
      } else {
        const starter = [SAKURA_CARDS[11], SAKURA_CARDS[12]];
        setCollection(starter);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(starter));
      }

      const storedPacks = localStorage.getItem(LOCAL_STORAGE_PACKS_KEY);
      if (storedPacks !== null) {
        setPacksAvailable(parseInt(storedPacks, 10));
      }

      const storedEssence = localStorage.getItem(LOCAL_STORAGE_ESSENCE_KEY);
      if (storedEssence !== null) {
        setEssence(parseInt(storedEssence, 10));
      }
    } catch (err) {
      console.warn("Storage warning:", err);
    }

    if (!isSupabaseConfigured) {
      setLoadingSession(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchRemoteUserData(session.user.id);
      }
      setLoadingSession(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchRemoteUserData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRemoteUserData = async (userId) => {
    try {
      const { data: colData, error: colErr } = await supabase
        .from("user_collections")
        .select("card_id, count, first_obtained_at")
        .eq("user_id", userId);

      if (colErr) throw colErr;

      if (colData && colData.length > 0) {
        const fetchedCards = [];
        colData.forEach(item => {
          const match = SAKURA_CARDS.find(c => c.id === item.card_id);
          if (match) {
            for (let i = 0; i < item.count; i++) {
              fetchedCards.push({
                ...match,
                instanceId: `${item.card_id}_${i}_remote`,
                obtainedAt: item.first_obtained_at
              });
            }
          }
        });
        setCollection(fetchedCards);
      }
    } catch (err) {
      console.warn("Failed fetching remote collection:", err.message);
    }
  };

  const openPack = useCallback(async (packId = "pack_genesis") => {
    if (packsAvailable <= 0) {
      setErrorMsg("No tienes sobres disponibles. Reclamación diaria lista en 24h.");
      return null;
    }

    setIsOpeningPack(true);
    setErrorMsg(null);

    await new Promise(r => setTimeout(r, 1200));

    try {
      const newCards = rollBoosterPack(packId, 5);
      
      let addedEssence = 0;
      const existingIds = new Set(collection.map(c => c.id));
      
      newCards.forEach(card => {
        if (existingIds.has(card.id)) {
          if (card.rarity.id === "C") addedEssence += 10;
          else if (card.rarity.id === "R") addedEssence += 25;
          else if (card.rarity.id === "SR") addedEssence += 60;
          else if (card.rarity.id === "UR") addedEssence += 150;
          else if (card.rarity.id === "ER") addedEssence += 400;
        }
      });

      const updatedCollection = [...collection, ...newCards];
      const updatedPacks = packsAvailable - 1;
      const updatedEssence = essence + addedEssence;

      setCollection(updatedCollection);
      setPacksAvailable(updatedPacks);
      setEssence(updatedEssence);
      setOpenedCards({ cards: newCards, addedEssence });

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCollection));
        localStorage.setItem(LOCAL_STORAGE_PACKS_KEY, updatedPacks.toString());
        localStorage.setItem(LOCAL_STORAGE_ESSENCE_KEY, updatedEssence.toString());
      } catch (e) {
        console.warn("Error saving collection locally", e);
      }

      if (user && isSupabaseConfigured) {
        newCards.forEach(async (c) => {
          await supabase.rpc("upsert_user_card", {
            p_user_id: user.id,
            p_card_id: c.id
          }).catch(err => {
            console.warn("Supabase sync warning:", err?.message || err);
          });
        });
      }

      return newCards;
    } catch (err) {
      setErrorMsg("Error al abrir el sobre. Inténtalo de nuevo.");
      return null;
    } finally {
      setIsOpeningPack(false);
    }
  }, [packsAvailable, collection, essence, user]);

  const claimFreePack = useCallback(() => {
    const updated = packsAvailable + 1;
    setPacksAvailable(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_PACKS_KEY, updated.toString());
    } catch (err) {
      console.warn("Error saving daily pack", err);
    }
  }, [packsAvailable]);

  const requestAccountDeletion = useCallback(async (reason, confirmationText) => {
    setAuthError(null);
    if (confirmationText !== "ELIMINAR MI CUENTA") {
      throw new Error("Debes escribir exactamente 'ELIMINAR MI CUENTA' para confirmar.");
    }

    if (user && isSupabaseConfigured) {
      const { error } = await supabase.rpc("request_account_deletion", {
        p_reason: reason || "Solicitado desde interfaz web de Anime Pack Opening",
        p_confirmation: confirmationText
      });

      if (error) {
        const { error: insertErr } = await supabase.from("account_deletion_requests").insert([{
          user_id: user.id,
          user_email: user.email,
          reason: reason || "Solicitud de usuario",
          status: "pending",
          requested_at: new Date().toISOString()
        }]);

        if (insertErr) throw new Error(insertErr.message);
      }

      await supabase.auth.signOut();
    }

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_PACKS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ESSENCE_KEY);
    setCollection([]);
    setUser(null);

    return true;
  }, [user]);

  return {
    user,
    loadingSession,
    collection,
    packsAvailable,
    essence,
    isOpeningPack,
    openedCards,
    setOpenedCards,
    errorMsg,
    setErrorMsg,
    authError,
    openPack,
    claimFreePack,
    requestAccountDeletion
  };
}
