import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { validateUsername, validatePassword } from "../../utils/validators";
import AuthInputForm from "../AuthInputForm/AuthInputForm";
import AuthError from "../AuthError/AuthError";
import AuthSubmitButton from "../AuthSubmitButton/AuthSubmitButton";

interface AuthFormProps {
  isLoginTab: boolean;
}

const AuthForm = ({ isLoginTab }: AuthFormProps) => {
  const { loginState } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      setAuthError(usernameValidation.message);
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setAuthError(passwordValidation.message);
      return;
    }

    setAuthLoading(true);
    const endpoint = isLoginTab ? "/api/auth/login" : "/api/auth/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Ocurrió un error en la autenticación");
      }

      loginState(json.data);
      setUsername("");
      setPassword("");
    } catch (err: any) {
      setAuthError("Ha surgido un error, intente nuevamente");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <form onSubmit={handleAuthSubmit} className="space-y-6">
      <AuthInputForm
        label="Nombre de Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="lucas-is-the-best"
      />

      <AuthInputForm
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      <AuthError message={authError} />

      <AuthSubmitButton
        isLoading={authLoading}
        label={isLoginTab ? "Ingresar al Prode" : "Registrarse y Jugar"}
      />
    </form>
  );
};

export default AuthForm;
