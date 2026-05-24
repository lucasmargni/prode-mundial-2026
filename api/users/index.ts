/* .../api/users/index.ts */
import type { IncomingMessage, ServerResponse } from "http";
import { getAllUsers } from "../../src/controllers/users.js";

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
    // Obtener todos los usuarios para el ranking
    if (method === "GET") {
      const users = await getAllUsers();
      return sendResponse(200, { status: "success", data: users });
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
