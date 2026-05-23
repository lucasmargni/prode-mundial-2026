import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  // Simulación de estado de usuario
  const isLoggedIn = false;

  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 bg-white/90 border-slate-200 text-text-main dark:bg-slate-900/90 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <span className="font-black text-xl tracking-wider uppercase">
              Prode<span className="text-primary">2026</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link
              to="/mi-prode"
              className="text-secondary transition-colors hover:text-primary"
            >
              Mi Prode
            </Link>
            <Link
              to="/reglas"
              className="text-secondary transition-colors hover:text-primary"
            >
              Reglas
            </Link>
          </div>

          {/* Modo claro/oscuro */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border transition-all active:scale-95 border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              title={
                theme === "light" ? "Activar modo oscuro" : "Activar modo claro"
              }
            >
              {theme === "light" ? "☀️" : "🌙"}
            </button>

            {/* Autenticación */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  U
                </div>
                <span className="hidden sm:inline font-medium text-sm">
                  Usuario
                </span>
              </div>
            ) : (
              <button className="py-2 px-4 rounded-lg font-semibold text-white shadow-md shadow-emerald-500/10 transition-all active:scale-95 bg-primary hover:opacity-90">
                Ingresar
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
