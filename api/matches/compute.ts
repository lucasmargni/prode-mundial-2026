import type { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import { prisma } from "../../src/lib/prisma.js";
import { checkIsAdmin, recomputeRankingPositions } from "../../src/controllers/users.js";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_super_segura_prode";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const sendResponse = (statusCode: number, data: any) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  if (req.method !== "POST") {
    return sendResponse(405, { error: "Método no permitido" });
  }

  // Verificar que sea admin
  const cookiesHeader = req.headers.cookie || "";
  const tokenCookie = cookiesHeader
    .split("; ")
    .find((r) => r.startsWith("token="));
  if (!tokenCookie) return sendResponse(401, { error: "No autenticado" });

  try {
    const decoded = jwt.verify(tokenCookie.split("=")[1], JWT_SECRET) as {
      userId: string;
    };
    const isAdmin = await checkIsAdmin(decoded.userId);
    if (!isAdmin)
      return sendResponse(403, {
        error: "Se requieren permisos de administrador",
      });
  } catch {
    return sendResponse(401, { error: "Token inválido" });
  }

  let body = "";
  await new Promise<void>((resolve, reject) => {
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve());
    req.on("error", reject);
  });

  const { matchId } = JSON.parse(body);
  if (!matchId) return sendResponse(400, { error: "Falta matchId" });

  try {
    // Traer el partido
    const match = await prisma.match.findUnique({ where: { id: matchId } });
    if (!match || !match.isFinished || !match.realResult) {
      return sendResponse(400, {
        error: "El partido no está cerrado o no tiene resultado",
      });
    }

    // Traer todas las predicciones de ese partido de una sola query
    const predictions = await prisma.prediction.findMany({
      where: { matchId },
      select: { userId: true, choice: true },
    });

    // Armar set de usuarios que acertaron
    const acertaron = new Set(
      predictions
        .filter((p) => p.choice === match.realResult)
        .map((p) => p.userId),
    );

    // Incrementar correctPredictions solo a quienes acertaron (una sola query)
    if (acertaron.size > 0) {
      await prisma.user.updateMany({
        where: { id: { in: [...acertaron] } },
        data: { correctPredictions: { increment: 1 } },
      });
    }

    await recomputeRankingPositions();

    return sendResponse(200, {
      status: "success",
      message: "Ranking actualizado",
    });
  } catch (error: any) {
    return sendResponse(500, {
      error: "Error al computar el ranking",
      details: error.message,
    });
  }
}
