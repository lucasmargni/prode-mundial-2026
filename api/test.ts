// api/test.ts
import type { IncomingMessage, ServerResponse } from "http";
import { prisma } from "../src/lib/prisma";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const users = await prisma.user.findMany();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "ok",
        message: "¡Conexión total lograda! API -> Prisma -> Neon funcionando.",
        data: users,
      }),
    );
  } catch (error: any) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "error",
        message: "Error al conectar con la base de datos",
        error: error.message || error,
      }),
    );
  }
}
