import type { IncomingMessage, ServerResponse } from "http";
import { getAllMatches } from "../../src/controllers/matches.js";

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
      const stage = parsedUrl.searchParams.get("stage");

      const matches = await getAllMatches(stage);
      return sendResponse(200, { status: "success", data: matches });
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
