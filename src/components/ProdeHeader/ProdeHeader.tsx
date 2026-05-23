import type { RankingUser } from "../../types/index";

interface ProdeHeaderProps {
  user: RankingUser;
  position: number; // Ahora es obligatorio para pintar la posición verdadera
}

export const ProdeHeader = ({ user, position }: ProdeHeaderProps) => {
  return (
    <header className="border-4 border-border-retro bg-bg-card p-6 mb-8 shadow-[4px_4px_0px_0px_var(--color-border-retro)] relative overflow-hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:8px_8px]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[radial-gradient(circle,transparent_20%,var(--color-bg-main)_21%)] bg-[size:8px_12px] bg-repeat-x"></div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-2">
        {/* Identificación del Jugador */}
        <div className="flex flex-col">
          {/* Contenedor del cuadro con más separación del nombre (mb-3) */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-black text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 border border-[#34d399]/30 tracking-wider uppercase">
              RANK #{position.toString().padStart(2, "0")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase text-border-retro tracking-tight break-all">
            {user.username}
          </h1>
        </div>

        {/* Marcadores Centrados */}
        <div className="flex gap-6 sm:gap-10 shrink-0 justify-around sm:justify-end sm:px-4">
          <div className="flex flex-col items-center text-center min-w-[70px]">
            <span className="text-[10px] font-black text-secondary uppercase tracking-wider">
              ACIERTOS
            </span>
            <span className="text-3xl font-black text-primary tracking-tighter mt-1 leading-none">
              {user.correctPredictions.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="border-l-2 border-dashed border-border-retro/20 self-stretch"></div>

          <div className="flex flex-col items-center text-center min-w-[70px]">
            <span className="text-[10px] font-black text-secondary uppercase tracking-wider">
              PUNTAJE
            </span>
            <span className="text-3xl font-black text-[#34d399] tracking-tighter mt-1 leading-none">
              {user.totalPoints.toString().padStart(2, "0")}{" "}
              <span className="text-xs font-bold text-secondary">PTS</span>
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[radial-gradient(circle,transparent_20%,var(--color-bg-main)_21%)] bg-[size:8px_12px] bg-repeat-x transform rotate-180"></div>
    </header>
  );
};

export default ProdeHeader;
