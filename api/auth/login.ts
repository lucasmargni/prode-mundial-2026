/* .../api/auth/login.ts */
import type { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import {
  existsUsername,
  verifyUserCredentials,
} from "../../src/controllers/users.js";

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

  // Solo se permite POST para login
  if (method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendResponse(405, { error: `Método ${method} no permitido` });
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  return req.on("end", async () => {
    try {
      const { username, password } = JSON.parse(body);

      if (
        !username ||
        !password ||
        username.trim() === "" ||
        password.trim() === ""
      ) {
        return sendResponse(400, {
          error: "El nombre de usuario y la contraseña son requeridos",
        });
      }

      const trimmedUsername = username.trim();

      const userExists = await existsUsername(trimmedUsername);
      if (!userExists) {
        return sendResponse(404, {
          error: "El nombre de usuario no se encuentra registrado",
        });
      }

      const user = await verifyUserCredentials(trimmedUsername, password);
      if (!user) {
        return sendResponse(401, {
          error: "La contraseña ingresada es incorrecta",
        });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "90d" },
      );

      const cookieOptions = [
        `token=${token}`,
        "Path=/",
        "HttpOnly",
        "SameSite=Strict",
        `Max-Age=${90 * 24 * 60 * 60}`,
      ];

      if (process.env.NODE_ENV === "production") {
        cookieOptions.push("Secure");
      }

      res.setHeader("Set-Cookie", cookieOptions.join("; "));
      return sendResponse(200, {
        status: "success",
        message: "Sesión iniciada con éxito",
        data: user,
      });
    } catch (jsonError: any) {
      return sendResponse(400, { error: "JSON malformado en el body" });
    }
  });
}
