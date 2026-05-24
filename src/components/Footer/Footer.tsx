import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Footer = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <footer className="w-full mt-auto border-t-4 border-border-retro bg-bg-card shadow-[0_-4px_0px_0px_var(--color-border-retro)] font-mono select-none bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:16px_16px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <span className="font-black text-xl tracking-wider uppercase text-text-main dark:text-white">
                Prode<span className="text-primary">2026</span>
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">
                Copa Mundial de la FIFA 2026
              </p>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex flex-col space-y-2 text-sm font-bold uppercase items-center md:items-start">
                <Link
                  to="/"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
                {isLoggedIn && (
                  <Link
                    to={`/prode/${user.id}`}
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    Mi Prode
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-3 self-center md:self-start">
            <p className="text-sm font-bold text-text-main dark:text-slate-300 text-center md:text-right">
              Diseñado y Desarrollado por{" "}
              <span className="text-primary font-black uppercase">
                Lucas Margni
              </span>
            </p>

            <a
              href="https://github.com/lucasmargni/prode-mundial-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-black uppercase px-3 py-1.5 border-2 border-border-retro bg-bg-main/50 hover:bg-primary/20 hover:text-primary transition-colors rounded-md shadow-[2px_2px_0px_0px_var(--color-border-retro)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_var(--color-border-retro)]"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>Repository</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t-2 border-border-retro/30 flex flex-col sm:flex-row justify-between items-center text-xs font-bold text-secondary uppercase tracking-wider space-y-2 sm:space-y-0">
          <div>© 2026 PRODE MUNDIAL. ALL RIGHTS RESERVED.</div>
          <div className="animate-pulse text-primary font-black">
            INSERT COIN
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
