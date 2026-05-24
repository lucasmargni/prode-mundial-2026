/* .../api/users/index.ts */
import type { IncomingMessage, ServerResponse } from "http";
import {
  existsUsername,
  createUser,
  getAllUsers,
} from "../../src/controllers/users.js";

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
    // obtener todos los usuarios
    if (method === "GET") {
      const users = await getAllUsers();
      return sendResponse(200, { status: "success", data: users });
    }

    // crear un nuevo usuario
    if (method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      return req.on("end", async () => {
        try {
          const { username } = JSON.parse(body);

          if (!username) {
            return sendResponse(400, {
              error: "Falta campo de usuario: username",
            });
          }

          if (await existsUsername(username)) {
            return sendResponse(409, { error: "Usuario ya existente" });
          }

          const result = await createUser(username);
          return sendResponse(201, { status: "success", data: result });
        } catch (jsonError: any) {
          return sendResponse(400, { error: "JSON malformado en el body" });
        }
      });
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
