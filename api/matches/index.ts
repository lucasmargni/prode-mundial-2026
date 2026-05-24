import type { IncomingMessage, ServerResponse } from "http";
import { getAllMatches, createMatch } from "../../src/controllers/matches.js";

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

    if (method === "POST") {
      let body = "";

      await new Promise<void>((resolve, reject) => {
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => resolve());
        req.on("error", (err) => reject(err));
      });

      const { id, stage, localTeamCode, awayTeamCode, date } = JSON.parse(body);

      if (!id || !stage || !localTeamCode || !awayTeamCode || !date) {
        return sendResponse(400, {
          status: "error",
          error: "Faltan campos obligatorios para crear el partido",
        });
      }

      const match = await createMatch({
        id,
        stage,
        localTeamCode,
        awayTeamCode,
        date,
      });
      return sendResponse(200, { status: "success", data: match });
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
