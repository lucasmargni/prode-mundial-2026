import type { RankingUser } from "../../types/index";

import medallaOro from "../../assets/medalla-oro.png";
import medallaPlata from "../../assets/medalla-plata.png";
import medallaBronce from "../../assets/medalla-bronce.png";

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
  const isPodium = (position: number) => position <= 3;

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
              const userIsPodium = isPodium(position);

              return (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-primary/10 border-b-4 border-border-retro last:border-b-0"
                >
                  {/* Columna de Posición con tamaño de medalla aumentado (h-16) */}
                  <td className="py-2 px-6">
                    <div className="flex items-center justify-center h-16">
                      {position === 1 && (
                        <img
                          src={medallaOro}
                          alt="1er Puesto"
                          className="h-16 w-auto object-contain [image-rendering:pixelated]"
                        />
                      )}
                      {position === 2 && (
                        <img
                          src={medallaPlata}
                          alt="2do Puesto"
                          className="h-16 w-auto object-contain [image-rendering:pixelated]"
                        />
                      )}
                      {position === 3 && (
                        <img
                          src={medallaBronce}
                          alt="3er Puesto"
                          className="h-16 w-auto object-contain [image-rendering:pixelated]"
                        />
                      )}
                      {!userIsPodium && (
                        <span className="text-2xl font-black tracking-tighter text-secondary">
                          {position.toString().padStart(2, "0")}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Jugador alineado al nuevo alto */}
                  <td
                    className={`py-2 px-6 text-lg font-black tracking-wide uppercase ${userIsPodium ? "text-[#f3db6b]" : "text-border-retro/80"}`}
                  >
                    {user.username}
                  </td>

                  {/* Predicciones Correctas */}
                  <td className="py-2 px-6 text-center text-xl font-black text-[#34d399]">
                    {user.correctPredictions.toString().padStart(2, "0")}
                  </td>

                  {/* Puntos */}
                  <td className="py-2 px-6 text-right text-2xl font-black text-[#34d399]">
                    {user.totalPoints.toString().padStart(2, "0")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;
