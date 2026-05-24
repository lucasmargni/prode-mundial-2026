import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!user) return null;

  const userInitial = user.username
    ? user.username.charAt(0).toUpperCase()
    : "U";

  const handleLogoutClick = async () => {
    setIsMenuOpen(false);
    await logout();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 cursor-pointer focus:outline-none group"
        title="Abrir menú de usuario"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold uppercase transition-transform group-hover:scale-105 group-active:scale-95">
          {userInitial}
        </div>
        <span className="hidden sm:inline font-medium text-sm text-text-main dark:text-slate-200 group-hover:text-primary transition-colors">
          Hola, <strong className="font-black">{user.username}</strong>!
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-3 h-3 text-secondary transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border shadow-xl bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 py-2 z-20 font-sans animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/50">
            <p className="text-xs text-secondary uppercase font-bold tracking-wider">
              Cuenta
            </p>
            <p className="text-sm font-bold text-text-main dark:text-white truncate mt-2 text-left">
              {user.username}
            </p>
          </div>

          <button
            onClick={handleLogoutClick}
            className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
