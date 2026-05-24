import type { PredictionChoice } from "../types/types";

interface APIDataPrediction {
  matchId: string;
  choice: PredictionChoice;
}

/* Obtener las predicciones guardadas de un usuario específico */
export const getUserPredictions = async (
  userId: string,
): Promise<Record<string, PredictionChoice>> => {
  try {
    const response = await fetch(`/api/predictions?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las predicciones del usuario");
    }

    const json = await response.json();
    const rawPredictions: APIDataPrediction[] = json.data || [];

    // Transformamos el array de la base de datos en el Record<string, PredictionChoice> que usa tu estado en el Front
    const predictionsMap: Record<string, PredictionChoice> = {};
    rawPredictions.forEach((pred) => {
      predictionsMap[pred.matchId] = pred.choice;
    });

    return predictionsMap;
  } catch (error) {
    console.error("Error en getUserPredictions:", error);
    return {};
  }
};

/* Guardar o actualizar las predicciones del usuario en lote (Upsert) */
export const saveUserPredictions = async (
  userId: string,
  predictions: Record<string, PredictionChoice>,
): Promise<boolean> => {
  try {
    // Transformamos el Record de la UI al formato de array estructurado [{ matchId, choice }] que espera el controlador
    const predictionsArray = Object.entries(predictions).map(
      ([matchId, choice]) => ({
        matchId,
        choice,
      }),
    );

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        predictions: predictionsArray,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al guardar las predicciones en el servidor");
    }

    return true;
  } catch (error) {
    console.error("Error en saveUserPredictions:", error);
    return false;
  }
};
