/* .../api/users/:id */
import type { IncomingMessage, ServerResponse } from "http";
import {
  existsUserId,
  getUserById,
  updateCorrectPredictions,
} from "../../src/controllers/users.js";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const method = req.method;

  // eliminar query params
  const urlWithoutQueries = req.url?.split("?")[0] || "";
  // separar url
  const urlParts = urlWithoutQueries.split("/").filter(Boolean);
  // obtener el id del usuario
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

    // modificar el dato del usuario pasado por body
    if (method === "PATCH") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      return req.on("end", async () => {
        try {
          const { correctPredictions } = JSON.parse(body);

          if (correctPredictions === undefined || correctPredictions === null) {
            return sendResponse(400, {
              error: "Falta campo de usuario: correctPredictions",
            });
          }

          const numericPredictions = Number(correctPredictions);

          if (isNaN(numericPredictions)) {
            return sendResponse(400, {
              error: "El campo correctPredictions debe ser un número válido",
            });
          }

          const result = await updateCorrectPredictions(
            userId,
            numericPredictions,
          );

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
