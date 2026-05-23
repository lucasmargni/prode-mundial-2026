import { Link } from "react-router-dom";
import type { RankingUser } from "../../types/index";

interface ProdeHeaderProps {
  user: RankingUser;
}

export const ProdeHeader = ({ user }: ProdeHeaderProps) => {
  return (
    <header className="border-4 border-border-retro bg-bg-card p-6 mb-8 shadow-[4px_4px_0px_0px_var(--color-border-retro)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-black text-primary uppercase bg-primary/10 px-2 py-1 border border-primary/20">
            TARJETA DE PUNTOS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-border-retro mt-2">
            {user.username}
          </h1>
          <p className="text-xs font-bold text-secondary uppercase mt-1">
            Aciertos: {user.correctPredictions.toString().padStart(2, "0")} |
            Total: {user.totalPoints.toString().padStart(2, "0")} PTS
          </p>
        </div>
        <Link
          to="/"
          className="self-start sm:self-center border-2 border-border-retro bg-bg-main px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-border-retro)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_var(--color-border-retro)]"
        >
          ← GENERAL RANKING
        </Link>
      </div>
    </header>
  );
};

export default ProdeHeader;
