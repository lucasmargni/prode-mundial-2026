/* .../api/matches/:id */
import type { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import {
  getMatchById,
  updateMatchResult,
  createMatch,
} from "../../src/controllers/matches.js";
import { checkIsAdmin } from "../../src/controllers/users.js";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_super_segura_prode";

async function getAuthenticatedUser(
  req: IncomingMessage,
): Promise<{ id: string } | null> {
  try {
    const cookiesHeader = req.headers.cookie || "";

    const tokenCookie = cookiesHeader
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (!tokenCookie) return null;

    const token = tokenCookie.split("=")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    return { id: decoded.userId };
  } catch {
    return null;
  }
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const method = req.method;

  const sendResponse = (statusCode: number, data: any) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  const parsedUrl = new URL(req.url || "", `http://${req.headers.host}`);
  const pathParts = parsedUrl.pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  if (!id || id === "[id]" || id === "matches") {
    return sendResponse(400, {
      status: "error",
      error: "Falta el identificador del partido en la URL",
    });
  }

  try {
    /* Obtener detalles del partido */
    if (method === "GET") {
      const match = await getMatchById(id);
      if (!match) {
        return sendResponse(404, {
          status: "error",
          error: `No se encontró ningún partido con el ID: ${id}`,
        });
      }
      return sendResponse(200, { status: "success", data: match });
    }

    /* Middleware de Seguridad compartido para POST y PATCH */
    if (method === "PATCH" || method === "POST") {
      const sessionUser = await getAuthenticatedUser(req);
      if (!sessionUser) {
        return sendResponse(401, {
          status: "error",
          error: "No autenticado. Inicie sesión nuevamente.",
        });
      }

      const isAdmin = await checkIsAdmin(sessionUser.id);
      if (!isAdmin) {
        return sendResponse(403, {
          status: "error",
          error: "Acceso denegado. Se requieren permisos de ADMINISTRADOR.",
        });
      }
    }

    /* Crear un nuevo partido usando el ID de la URL */
    if (method === "POST") {
      let body = "";
      await new Promise<void>((resolve, reject) => {
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => resolve());
        req.on("error", (err) => reject(err));
      });

      const { stage, localTeamCode, awayTeamCode, date } = JSON.parse(body);

      if (!stage || !localTeamCode || !awayTeamCode || !date) {
        return sendResponse(400, {
          status: "error",
          error:
            "Faltan campos obligatorios para crear el partido (stage, localTeamCode, awayTeamCode, date)",
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

    /* Actualizar goles y cerrar partido */
    if (method === "PATCH") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      await new Promise((resolve) => req.on("end", resolve));

      if (!body) {
        return sendResponse(400, {
          status: "error",
          error: "El cuerpo de la petición está vacío",
        });
      }

      const { realGoalsLocal, realGoalsAway } = JSON.parse(body);

      if (
        typeof realGoalsLocal !== "number" ||
        typeof realGoalsAway !== "number"
      ) {
        return sendResponse(400, {
          status: "error",
          error:
            "Los campos realGoalsLocal y realGoalsAway son obligatorios y deben ser numéricos",
        });
      }

      const updatedMatch = await updateMatchResult(id, {
        realGoalsLocal,
        realGoalsAway,
      });

      return sendResponse(200, { status: "success", data: updatedMatch });
    }

    res.setHeader("Allow", "GET, POST, PATCH");
    return sendResponse(405, { error: `Método ${method} no permitido` });
  } catch (error: any) {
    return sendResponse(500, {
      error: "Error interno en el servidor o base de datos",
      details: error.message,
    });
  }
}
