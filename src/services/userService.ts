import localforage from "localforage";
import type { RankingUser } from "../types/types";

// Constante de tiempo (3 minutos)
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

    // Si el cache existe y es nuevo, devolver datos en cache (Siempre y cuando NO se fuerce la búsqueda)
    if (
      !options?.force &&
      cachedData &&
      cachedTime &&
      now - cachedTime < CACHE_DURATION_MS
    ) {
      return cachedData;
    }

    // Si expiro o se forzo la busqueda, consultar datos en la api saltando cache de red
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
    }));

    const sortedUsers = mappedUsers.sort(
      (a, b) => b.correctPredictions - a.correctPredictions,
    );

    await localforage.setItem(RANKING_KEY, sortedUsers);
    await localforage.setItem(RANKING_TIME_KEY, now);

    return sortedUsers;
  } catch (error) {
    console.error("Error en getRanking:", error);
    // Contingencia: si cae la red, devolvemos lo ultimo que quedo en cache
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

    // Si expiro, consultar datos en la api
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      throw new Error(`No se pudo obtener el usuario con ID: ${id}`);
    }

    const json = await response.json();
    const dbUser = json.data;

    if (!dbUser) return null;

    const user: RankingUser = {
      id: dbUser.id,
      username: dbUser.username,
      totalPoints: dbUser.correctPredictions * MULTIPLICATIVE_POINTS,
      correctPredictions: dbUser.correctPredictions,
    };

    const position = dbUser.rankingPosition ?? 0;

    const result = { user, position };

    // Guardamos el objeto completo devuelto en la caché
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
