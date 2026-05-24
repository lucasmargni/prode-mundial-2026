import type { RankingUser } from "../types/types";

const MULTIPLICADOR_PUNTAJE = 3;

/* Obtener todos los usuarios de la base de datos ordenados por puntaje */
export const getRanking = async (): Promise<RankingUser[]> => {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) throw new Error("Error al obtener el ranking");

    const json = await response.json();
    const usersFromDB = json.data;

    // Se mapea los datos de la DB al tipo que esperan los componentes
    const mappedUsers: RankingUser[] = usersFromDB.map((u: any) => ({
      id: u.id,
      username: u.username,
      totalPoints: u.correctPredictions * MULTIPLICADOR_PUNTAJE,
      correctPredictions: u.correctPredictions,
    }));

    return mappedUsers.sort(
      (a, b) => b.correctPredictions - a.correctPredictions,
    );
  } catch (error) {
    console.error("Error en getRanking:", error);
    return [];
  }
};

/* Obtener los detalles de un usuario especifico */
export const getUserDetails = async (
  id: string,
): Promise<{ user: RankingUser; position: number } | null> => {
  try {
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
      totalPoints: dbUser.correctPredictions * MULTIPLICADOR_PUNTAJE,
      correctPredictions: dbUser.correctPredictions,
    };

    return {
      user,
      position: 1, // TODO: CAMBIAR A POSICION REAL, QUE SE GUARDA EN LA DB
    };
  } catch (error) {
    console.error("Error en getUserDetails:", error);
    return null;
  }
};
