import type { IncomingMessage, ServerResponse } from "http";
import {
  existsUserId,
  getUserById,
  updateUserData,
} from "../../src/controllers/users.js";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const method = req.method;

  const urlWithoutQueries = req.url?.split("?")[0] || "";
  const urlParts = urlWithoutQueries.split("/").filter(Boolean);
  const userId = urlParts[urlParts.length - 1] || "";

  const sendResponse = (statusCode: number, data: any) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  try {
    if (!userId) {
      return sendResponse(400, {
        error: "Falta id del usuario en la ruta",
      });
    }

    const userExists = await existsUserId(userId);

    if (!userExists) {
      return sendResponse(404, { error: "Usuario no encontrado" });
    }

    // obtener el usuario del id pasado
    if (method === "GET") {
      const user = await getUserById(userId);
      return sendResponse(200, { status: "success", data: user });
    }

    // modificar los datos del usuario pasado por body
    if (method === "PATCH") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      return req.on("end", async () => {
        try {
          const { correctPredictions, rankingPosition } = JSON.parse(body);

          // Objeto dinámico que contendrá solo los campos enviados
          const fieldsToUpdate: {
            correctPredictions?: number;
            rankingPosition?: number;
          } = {};

          // Validar correctPredictions si viene en el body
          if (correctPredictions !== undefined && correctPredictions !== null) {
            const numericPredictions = Number(correctPredictions);
            if (isNaN(numericPredictions)) {
              return sendResponse(400, {
                error: "El campo correctPredictions debe ser un número válido",
              });
            }
            fieldsToUpdate.correctPredictions = numericPredictions;
          }

          // Validar rankingPosition si viene en el body
          if (rankingPosition !== undefined && rankingPosition !== null) {
            const numericRanking = Number(rankingPosition);
            if (isNaN(numericRanking)) {
              return sendResponse(400, {
                error: "El campo rankingPosition debe ser un número válido",
              });
            }
            fieldsToUpdate.rankingPosition = numericRanking;
          }

          // Si no vino ninguno de los dos campos
          if (Object.keys(fieldsToUpdate).length === 0) {
            return sendResponse(400, {
              error:
                "Se requiere al menos uno de los campos válidos para actualizar: correctPredictions o rankingPosition",
            });
          }

          // Enviamos el objeto con los datos procesados al controlador
          const result = await updateUserData(userId, fieldsToUpdate);

          return sendResponse(200, { status: "success", data: result });
        } catch (jsonError: any) {
          return sendResponse(400, { error: "JSON malformado en el body" });
        }
      });
    }

    res.setHeader("Allow", "GET, PATCH");
    return sendResponse(405, { error: `Método ${method} no permitido` });
  } catch (error: any) {
    return sendResponse(500, {
      error: "Error interno en el servidor o base de datos",
      details: error.message,
    });
  }
}
