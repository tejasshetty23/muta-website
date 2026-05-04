// ─────────────────────────────────────────────────────────────
// useMutaData.js – React hook for consuming muta.bet data
// ─────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { getAllMutaData } from "./mutaData";

// Default/fallback data matching original hardcoded values
const DEFAULTS = {
  stats: [
    { label: "Total Winnings", value: 12840, prefix: "$" },
    { label: "Biggest Win", value: 1865, prefix: "$" },
    { label: "Current Balance", value: 427, prefix: "$" },
  ],
  games: [],
  wins: [],
  socials: [
    { label: "Discord", href: "https://discord.com/" },
    { label: "Telegram", href: "https://telegram.org/" },
    { label: "Kick", href: "https://kick.com/muta11" },
  ],
};

export function useMutaData() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        // getAllMutaData is synchronous (uses embedded data), but
        // wrapped in async for future API integration
        const result = getAllMutaData();
        if (!cancelled) {
          setData(result);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load muta data:", err);
          setError(err);
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    stats: data?.stats ?? DEFAULTS.stats,
    games: data?.games ?? DEFAULTS.games,
    wins: data?.wins ?? DEFAULTS.wins,
    socials: data?.socials ?? DEFAULTS.socials,
    partners: data?.partners ?? [],
    isLoading,
    error,
  };
}
