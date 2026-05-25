import localforage from "localforage";
import type { RankingUser, Match, UserPrediction } from "../types/types";

const CACHE_DURATION_MS = 3 * 60 * 1000;
const MULTIPLICATIVE_POINTS = 3;

interface GetRankingOptions {
  force?: boolean;
}

/* Obtener el ranking completo */
export const getRanking = async (
  options?: GetRankingOptions,
): Promise<RankingUser[]> => {
  const RANKING_KEY = "ranking_data";
  const RANKING_TIME_KEY = "ranking_cache_time";
  const now = Date.now();

  try {
    const cachedData = await localforage.getItem<RankingUser[]>(RANKING_KEY);
    const cachedTime = await localforage.getItem<number>(RANKING_TIME_KEY);

    if (
      !options?.force &&
      cachedData &&
      cachedTime &&
      now - cachedTime < CACHE_DURATION_MS
    ) {
      return cachedData;
    }

    const cacheBuster = options?.force ? `?t=${now}` : "";
    const response = await fetch(`/api/users${cacheBuster}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    if (!response.ok) throw new Error("Error al obtener el ranking");

    const json = await response.json();
    const usersFromDB = json.data;

    const mappedUsers: RankingUser[] = usersFromDB.map((u: any) => ({
      id: u.id,
      username: u.username,
      totalPoints: u.correctPredictions * MULTIPLICATIVE_POINTS,
      correctPredictions: u.correctPredictions,
      rankingPosition: u.rankingPosition ?? undefined,
    }));

    const sortedUsers = mappedUsers.sort((a, b) => {
      const posA = a.rankingPosition ?? Infinity;
      const posB = b.rankingPosition ?? Infinity;
      return posA - posB;
    });

    await localforage.setItem(RANKING_KEY, sortedUsers);
    await localforage.setItem(RANKING_TIME_KEY, now);

    return sortedUsers;
  } catch (error) {
    console.error("Error en getRanking:", error);
    const backup = await localforage.getItem<RankingUser[]>(RANKING_KEY);
    return backup || [];
  }
};

/* Obtener los detalles de un usuario por id */
export const getUserDetails = async (
  id: string,
): Promise<{ user: RankingUser; position: number } | null> => {
  const USER_KEY = `user_data_${id}`;
  const USER_TIME_KEY = `user_cache_time_${id}`;
  const now = Date.now();

  try {
    const cachedData = await localforage.getItem<{
      user: RankingUser;
      position: number;
    }>(USER_KEY);
    const cachedTime = await localforage.getItem<number>(USER_TIME_KEY);

    if (cachedData && cachedTime && now - cachedTime < CACHE_DURATION_MS) {
      return cachedData;
    }

    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      throw new Error(`No se pudo obtener el usuario con ID: ${id}`);
    }

    const json = await response.json();
    const dbUser = json.data;

    if (!dbUser) return null;

    const position = dbUser.rankingPosition ?? 0;

    const user: RankingUser = {
      id: dbUser.id,
      username: dbUser.username,
      totalPoints: dbUser.correctPredictions * MULTIPLICATIVE_POINTS,
      correctPredictions: dbUser.correctPredictions,
      rankingPosition: position,
    };

    const result = { user, position };

    await localforage.setItem(USER_KEY, result);
    await localforage.setItem(USER_TIME_KEY, now);

    return result;
  } catch (error) {
    console.error("Error en getUserDetails:", error);
    const backupData = await localforage.getItem<{
      user: RankingUser;
      position: number;
    }>(USER_KEY);
    return backupData || null;
  }
};

/* Procesa puntos y rankings completos desde el cliente */
export const computeScoresAndPositionsAfterMatch = async (
  finishedMatch: Match,
): Promise<void> => {
  try {
    const usersResponse = await fetch("/api/users", { method: "GET" });
    if (!usersResponse.ok)
      throw new Error(
        "No se pudo obtener la lista de usuarios para calcular puntos.",
      );
    const usersJson = await usersResponse.json();
    const allUsersFromDB = usersJson.data || [];

    // Revisar predicciones individuales y sumar aciertos
    const updatedUsersList: RankingUser[] = [];

    for (const u of allUsersFromDB) {
      let currentAciertos = Number(u.correctPredictions) || 0;

      // Consultar el endpoint de predicciones para este usuario específico
      const predResponse = await fetch(`/api/predictions?userId=${u.id}`, {
        method: "GET",
      });

      if (predResponse.ok) {
        const predJson = await predResponse.json();
        const userPredictions: UserPrediction[] = predJson.data || [];

        // Buscar si este usuario predijo el partido en cuestión
        const matchPrediction = userPredictions.find(
          (p) => p.matchId === finishedMatch.id,
        );

        // Si predijo y su elección coincide con el resultado real del partido, sumamos un acierto
        if (
          matchPrediction &&
          matchPrediction.choice === finishedMatch.realResult
        ) {
          currentAciertos += 1;

          // Impactamos los nuevos aciertos inmediatamente en su endpoint PATCH individual
          await fetch(`/api/users/${u.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correctPredictions: currentAciertos }),
          });
        }
      }

      // Guardamos en memoria el estado temporal del usuario para el posterior cálculo de posiciones
      updatedUsersList.push({
        id: u.id,
        username: u.username,
        correctPredictions: currentAciertos,
        totalPoints: currentAciertos * MULTIPLICATIVE_POINTS,
      });
    }

    // Ordenar la lista completa según los nuevos puntajes acumulados
    // Mayor cantidad de predicciones correctas va primero en la tabla
    const tempSorted = [...updatedUsersList].sort(
      (a, b) => b.correctPredictions - a.correctPredictions,
    );

    // Asignar posiciones relativas consecutivas y fijarlas en la base de datos
    for (let index = 0; index < tempSorted.length; index++) {
      const assignedPosition = index + 1;
      const targetUser = tempSorted[index];

      // Modificar nueva posicion real de los usuarios
      await fetch(`/api/users/${targetUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rankingPosition: assignedPosition }),
      });
    }

    await localforage.removeItem("ranking_data");
    await localforage.removeItem("ranking_cache_time");

    for (const u of tempSorted) {
      await localforage.removeItem(`user_data_${u.id}`);
      await localforage.removeItem(`user_cache_time_${u.id}`);
    }
  } catch (error) {
    console.error(
      "Error crítico en la orquestación de cómputos en el cliente:",
      error,
    );
    throw error;
  }
};
