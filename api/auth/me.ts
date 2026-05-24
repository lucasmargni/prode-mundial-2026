/* .../api/auth/me.ts */
import type { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import { getUserById } from "../../src/controllers/users.js";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_super_segura_prode";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const method = req.method;

  const sendResponse = (statusCode: number, data: any) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  // Solo se permite POST para sesion actual
  if (method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendResponse(405, { error: `Método ${method} no permitido` });
  }

  try {
    const cookiesHeader = req.headers.cookie || "";

    const tokenCookie = cookiesHeader
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (!tokenCookie) {
      return sendResponse(401, { error: "No hay sesión activa (Falta token)" });
    }

    const token = tokenCookie.split("=")[1];

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      return sendResponse(401, { error: "Sesión expirada o token inválido" });
    }

    const user = await getUserById(decoded.userId);

    if (!user) {
      return sendResponse(404, {
        error: "El usuario de la sesión ya no existe",
      });
    }

    return sendResponse(200, {
      status: "success",
      data: user,
    });
  } catch (error: any) {
    return sendResponse(500, {
      error: "Error interno verificando la sesión",
      details: error.message,
    });
  }
}
