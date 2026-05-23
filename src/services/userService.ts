import type { RankingUser } from "../types/types";

const rankingMock: RankingUser[] = [
  {
    id: "1",
    username: "JUANPEREZ_10",
    totalPoints: 290,
    correctPredictions: 25,
  },
  {
    id: "2",
    username: "JUANPEREZ_9",
    totalPoints: 160,
    correctPredictions: 23,
  },
  {
    id: "3",
    username: "RODO GIET_5",
    totalPoints: 150,
    correctPredictions: 16,
  },
  { id: "4", username: "GUANPREZ_3", totalPoints: 10, correctPredictions: 11 },
  { id: "5", username: "JUANPEREZ_1", totalPoints: 10, correctPredictions: 10 },
];

// Obtener todos los usuarios ordenados por puntaje
export const getRanking = async (): Promise<RankingUser[]> => {
  return [...rankingMock].sort((a, b) => b.totalPoints - a.totalPoints);
};

export const getUserDetails = async (
  id: string,
): Promise<{ user: RankingUser; position: number } | null> => {
  const sortedRanking = [...rankingMock].sort(
    (a, b) => b.totalPoints - a.totalPoints,
  );
  const index = sortedRanking.findIndex((u) => u.id === id);

  if (index === -1) return null;

  return {
    user: sortedRanking[index],
    position: index + 1,
  };
};
