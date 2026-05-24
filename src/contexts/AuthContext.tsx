import React, { createContext, useContext, useState, useEffect } from "react";
import type { RankingUser } from "../types/types";

interface AuthContextType {
  user: RankingUser | null;
  loading: boolean;
  loginState: (userData: RankingUser) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<RankingUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const json = await response.json();
          setUser(json.data);
        }
      } catch (error) {
        console.error("Error verificando sesión inicial:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const loginState = (userData: RankingUser) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};
