import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex items-center justify-center min-h-[70vh] px-4 font-mono select-none">
    <div className="border-4 border-border-retro bg-bg-card shadow-[8px_8px_0px_0px_var(--color-border-retro)] p-10 max-w-sm w-full text-center">

      <div className="text-7xl mb-4">🟥</div>

      <div className="text-8xl font-black text-[#e63946] tracking-tighter leading-none mb-1">
        404
      </div>

      <div className="text-xs font-black uppercase tracking-[0.25em] text-[#e63946] mb-6">
        TARJETA ROJA
      </div>

      <div className="border-t-4 border-border-retro pt-6 mb-6 space-y-1">
        <p className="font-black uppercase text-border-retro text-sm">
          PÁGINA EXPULSADA DEL PARTIDO
        </p>
        <p className="text-xs uppercase text-secondary font-bold">
          Esta dirección no existe en el campo de juego.
        </p>
      </div>

      <Link
        to="/"
        className="inline-block border-4 border-border-retro bg-bg-card px-6 py-3 font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_0px_var(--color-border-retro)] hover:bg-primary/10 hover:border-primary transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_var(--color-border-retro)]"
      >
        ⚽ VOLVER AL INICIO
      </Link>

    </div>
  </div>
);

export default NotFound;
