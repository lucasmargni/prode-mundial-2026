import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "../UserMenu/UserMenu";
import CreateMatchModal from "../CreateMatchModal/CreateMatchModal";
import ManageMatchModal from "../ManageMatchModal/ManageMatchModal";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  const isLoggedIn = !!user;
  const isAdmin = isLoggedIn && user.role === "ADMIN";

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-300 bg-bg-card/90 border-secondary/20 text-border-retro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 cursor-pointer">
              <span className="font-black text-xl tracking-wider uppercase">
                Prode<span className="text-primary">2026</span>
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              {/* Opciones Admin uniformes con "Mi Prode" */}
              {isAdmin && (
                <>
                  <button
                    onClick={() => setIsCreateOpen(true)}
                    className="text-sm font-medium text-secondary transition-colors hover:text-primary cursor-pointer bg-transparent border-none"
                  >
                    Agregar Partido
                  </button>
                  <button
                    onClick={() => setIsManageOpen(true)}
                    className="text-sm font-medium text-secondary transition-colors hover:text-primary cursor-pointer bg-transparent border-none"
                  >
                    Cargar Resultados
                  </button>
                </>
              )}

              {/* Mi Prode */}
              {isLoggedIn && (
                <Link
                  to={`/prode/${user.id}`}
                  className="text-sm font-medium text-secondary transition-colors hover:text-primary"
                >
                  Mi Prode
                </Link>
              )}

              {isLoggedIn ? (
                <UserMenu />
              ) : (
                <button className="py-2 px-4 text-sm font-semibold text-white shadow-md shadow-emerald-500/10 transition-all active:scale-95 bg-primary hover:opacity-90">
                  Ingresar
                </button>
              )}

              {/* Modo claro/oscuro */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border transition-all active:scale-95 border-secondary/20 bg-bg-main hover:bg-secondary/10 cursor-pointer"
                title={
                  theme === "light"
                    ? "Activar modo oscuro"
                    : "Activar modo claro"
                }
              >
                {theme === "light" ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isCreateOpen && (
        <CreateMatchModal onClose={() => setIsCreateOpen(false)} />
      )}
      {isManageOpen && (
        <ManageMatchModal onClose={() => setIsManageOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
