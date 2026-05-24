import localforage from "localforage";
import type { Match, TournamentStage } from "../types/types";
import { inflateTeam } from "../utils/teams.js";

const CACHE_DURATION_MS = 3 * 60 * 1000;

const formatRetroDate = (dateString: string): string => {
  const d = new Date(dateString);
  const months = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];

  const day = d.getUTCDate();
  const month = months[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const hours = String(d.getUTCHours()).padStart(2, "0");
  const minutes = String(d.getUTCMinutes()).padStart(2, "0");

  // Armamos la cadena con tu estructura exacta: 11 JUN 2026 - 16:00 HS
  return `${day} ${month} ${year} - ${hours}:${minutes} hs`;
};

const mapDBMatches = (matchesFromDB: any[]): Match[] => {
  return matchesFromDB.map((m: any) => ({
    id: m.id,
    stage: m.stage as TournamentStage,
    localTeam: inflateTeam(m.localTeamCode),
    awayTeam: inflateTeam(m.awayTeamCode),
    date: formatRetroDate(m.date),
    isFinished: m.isFinished,
    realGoalsLocal: m.realGoalsLocal ?? undefined,
    realGoalsAway: m.realGoalsAway ?? undefined,
    realResult: m.realResult ?? undefined,
  }));
};

/* Obtener todos los partidos */
export const getAllMatches = async (): Promise<Match[]> => {
  const now = Date.now();
  const CACHE_KEY = "matches_data_all";
  const TIME_KEY = "matches_cache_time_all";

  try {
    const cachedData = await localforage.getItem<Match[]>(CACHE_KEY);
    const cachedTime = await localforage.getItem<number>(TIME_KEY);

    if (cachedData && cachedTime && now - cachedTime < CACHE_DURATION_MS) {
      return cachedData;
    }

    const response = await fetch("/api/matches", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error al obtener todos los partidos");

    const json = await response.json();
    const mappedMatches = mapDBMatches(json.data || []);

    await localforage.setItem(CACHE_KEY, mappedMatches);
    await localforage.setItem(TIME_KEY, now);

    return mappedMatches;
  } catch (error) {
    console.error("Error en getAllMatches:", error);
    const backup = await localforage.getItem<Match[]>(CACHE_KEY);
    return backup || [];
  }
};

/* Obtener partidos filtrados por Etapa */
export const getMatchesByStage = async (
  stage: TournamentStage,
): Promise<Match[]> => {
  const now = Date.now();
  const CACHE_KEY = `matches_data_${stage}`;
  const TIME_KEY = `matches_cache_time_${stage}`;

  try {
    const cachedData = await localforage.getItem<Match[]>(CACHE_KEY);
    const cachedTime = await localforage.getItem<number>(TIME_KEY);

    if (cachedData && cachedTime && now - cachedTime < CACHE_DURATION_MS) {
      return cachedData;
    }

    const response = await fetch(`/api/matches?stage=${stage}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok)
      throw new Error(`Error al obtener los partidos de la etapa ${stage}`);

    const json = await response.json();
    const mappedMatches = mapDBMatches(json.data || []);

    await localforage.setItem(CACHE_KEY, mappedMatches);
    await localforage.setItem(TIME_KEY, now);

    return mappedMatches;
  } catch (error) {
    console.error(`Error en getMatchesByStage (${stage}):`, error);
    const backup = await localforage.getItem<Match[]>(CACHE_KEY);
    return backup || [];
  }
};
