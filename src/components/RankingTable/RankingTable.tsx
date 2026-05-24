import { useEffect, useState } from "react";
import type { RankingUser } from "../../types/types";
import RankingItem from "../RankingItem/RankingItem";
import { getRanking } from "../../services/userService";
import { useAuth } from "../../contexts/AuthContext";

const RankingTable = () => {
  const { user: currentUser } = useAuth();
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        const data = await getRanking({ force: true });
        setRanking(data);
      } catch (error) {
        console.error("Error al cargar el ranking en la UI:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [currentUser]);

  return (
    <div className="w-full overflow-hidden border-4 border-border-retro bg-bg-card shadow-[4px_4px_0px_0px_var(--color-border-retro)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono select-none">
          <thead>
            <tr className="border-b-4 border-border-retro bg-bg-main/80 text-sm font-black uppercase tracking-wider">
              <th className="py-4 px-6 text-center w-28">POSICIÓN</th>
              <th className="py-4 px-6">JUGADOR</th>
              <th className="py-4 px-6 text-center w-48">
                PREDICCIONES
                <br />
                CORRECTAS
              </th>
              <th className="py-4 px-6 text-right w-36">PUNTOS</th>
            </tr>
          </thead>

          <tbody className="divide-y-4 divide-border-retro font-bold text-base bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:16px_16px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]">
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center animate-pulse tracking-widest uppercase"
                >
                  Cargando Ranking...
                </td>
              </tr>
            ) : ranking.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center uppercase">
                  No hay jugadores registrados
                </td>
              </tr>
            ) : (
              ranking.map((user, index) => {
                const position = index + 1;
                return (
                  <RankingItem
                    key={user.id}
                    user={user}
                    position={position}
                    isCurrentUser={currentUser?.id === user.id}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;
