/* .../api/auth/register.ts */
import type { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import { createUser, existsUsername } from "../../src/controllers/users.js";

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

  // Solo se permite POST para registro
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
      const userExists = await existsUsername(username.trim());
      if (userExists) {
        return sendResponse(409, {
          error: "El nombre de usuario ya está en uso",
        });
      }

      const newUser = await createUser(username.trim(), password);

      const token = jwt.sign(
        { userId: newUser.id, username: newUser.username },
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
      return sendResponse(201, {
        status: "success",
        message: "Usuario registrado e iniciado sesión con éxito",
        data: newUser,
      });
    } catch (jsonError: any) {
      return sendResponse(400, { error: "JSON malformado en el body" });
    }
  });
}
