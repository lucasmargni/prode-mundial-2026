import type { IncomingMessage, ServerResponse } from "http";
import {
  getUserPredictions,
  saveUserPredictions,
} from "../../src/controllers/predictions.js";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const method = req.method;

  const sendResponse = (statusCode: number, data: any) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  try {
    if (method === "GET") {
      const parsedUrl = new URL(req.url || "", `http://${req.headers.host}`);
      const userId = parsedUrl.searchParams.get("userId");

      // Si no se pasa userId y devuelve todo
      const predictions = await getUserPredictions(userId);
      return sendResponse(200, { status: "success", data: predictions });
    }

    if (method === "POST") {
      let body = "";

      await new Promise<void>((resolve, reject) => {
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => resolve());
        req.on("error", (err) => reject(err));
      });

      const { userId, predictions } = JSON.parse(body);

      if (!userId || !predictions || !Array.isArray(predictions)) {
        return sendResponse(400, {
          status: "error",
          error: "Datos de entrada inválidos",
        });
      }

      await saveUserPredictions(userId, predictions);
      return sendResponse(200, {
        status: "success",
        message: "Predicciones guardadas correctamente",
      });
    }

    res.setHeader("Allow", "GET, POST");
    return sendResponse(405, { error: `Método ${method} no permitido` });
  } catch (error: any) {
    return sendResponse(500, {
      error: "Error interno en el servidor o base de datos",
      details: error.message,
    });
  }
}
