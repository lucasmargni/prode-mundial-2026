/* .../api/auth/logout.ts */
import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const method = req.method;

  const sendResponse = (statusCode: number, data: any) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  // Solo se permite POST para logout
  if (method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendResponse(405, { error: `Método ${method} no permitido` });
  }

  // se borra la cookie
  const cookieOptions = [
    "token=",
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    "Max-Age=0",
  ];

  if (process.env.NODE_ENV === "production") {
    cookieOptions.push("Secure");
  }

  res.setHeader("Set-Cookie", cookieOptions.join("; "));
  return sendResponse(200, {
    status: "success",
    message: "Sesión cerrada con éxito",
  });
}
