import type { RankingUser } from "../../types/index";
import RankingItem from "../RankingItem/RankingItem";

const rankingMock: RankingUser[] = [
  {
    id: "1",
    username: "JUANPEREZ_10",
    totalPoints: 290,
    correctPredictions: 25,
  },
  {
    id: "2",
    username: "JUANPEREZ_9",
    totalPoints: 160,
    correctPredictions: 23,
  },
  {
    id: "3",
    username: "RODO GIET_5",
    totalPoints: 150,
    correctPredictions: 16,
  },
  { id: "4", username: "GUANPREZ_3", totalPoints: 10, correctPredictions: 11 },
  { id: "5", username: "JUANPEREZ_1", totalPoints: 10, correctPredictions: 10 },
];

const RankingTable = () => {
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
            {rankingMock.map((user, index) => {
              const position = index + 1;

              return (
                <RankingItem key={user.id} user={user} position={position} />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;
