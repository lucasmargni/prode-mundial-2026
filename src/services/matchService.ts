import type { Match, TournamentStage } from "../types/types";

const matchesMock: Match[] = [
  {
    id: "m1",
    stage: "GRUPOS",
    localTeam: { id: "t1", name: "ARGENTINA", code: "ARG", flagUrl: "🇦🇷" },
    awayTeam: { id: "t2", name: "FRANCIA", code: "FRA", flagUrl: "🇫🇷" },
    date: "24 MAY - 16:00 HS",
    isFinished: true,
    realGoalsLocal: 3,
    realGoalsAway: 2,
    realResult: "L",
  },
  {
    id: "m2",
    stage: "GRUPOS",
    localTeam: { id: "t3", name: "URUGUAY", code: "URU", flagUrl: "🇺🇾" },
    awayTeam: { id: "t4", name: "PORTUGAL", code: "POR", flagUrl: "🇵🇹" },
    date: "25 MAY - 13:00 HS",
    isFinished: false,
  },
  {
    id: "m3",
    stage: "16VOS",
    localTeam: { id: "t5", name: "ESPAÑA", code: "ESP", flagUrl: "🇪🇸" },
    awayTeam: { id: "t6", name: "JAPÓN", code: "JPN", flagUrl: "🇯🇵" },
    date: "18 JUN - 15:00 HS",
    isFinished: false,
  },
  {
    id: "m4",
    stage: "8VOS",
    localTeam: { id: "t1", name: "ARGENTINA", code: "ARG", flagUrl: "🇦🇷" },
    awayTeam: { id: "t7", name: "ITALIA", code: "ITA", flagUrl: "🇮🇹" },
    date: "29 JUN - 20:00 HS",
    isFinished: false,
  },
];

// Obtener todos los partidos de una etapa específica
export const getMatchesByStage = async (
  stage: TournamentStage,
): Promise<Match[]> => {
  return matchesMock.filter((match) => match.stage === stage);
};

// Obtener la totalidad de los partidos cargados
export const getAllMatches = async (): Promise<Match[]> => {
  return matchesMock;
};
