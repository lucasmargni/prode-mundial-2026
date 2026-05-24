import type { IncomingMessage, ServerResponse } from "http";
import { getMatchById } from "../../src/controllers/matches.js";

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
      const pathParts = parsedUrl.pathname.split("/");
      const id = pathParts[pathParts.length - 1];

      if (!id || id === "[id]" || id === "matches") {
        return sendResponse(400, {
          status: "error",
          error: "Falta el identificador del partido en la URL",
        });
      }

      const match = await getMatchById(id);

      if (!match) {
        return sendResponse(404, {
          status: "error",
          error: `No se encontró ningún partido con el ID: ${id}`,
        });
      }

      return sendResponse(200, { status: "success", data: match });
    }

    res.setHeader("Allow", "GET");
    return sendResponse(405, { error: `Método ${method} no permitido` });
  } catch (error: any) {
    return sendResponse(500, {
      error: "Error interno en el servidor o base de datos",
      details: error.message,
    });
  }
}
