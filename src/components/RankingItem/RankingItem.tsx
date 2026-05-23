import { useNavigate } from "react-router-dom";
import type { RankingUser } from "../../types/index";

import medallaOro from "../../assets/medalla-oro.png";
import medallaPlata from "../../assets/medalla-plata.png";
import medallaBronce from "../../assets/medalla-bronce.png";

interface RankingItemProps {
  user: RankingUser;
  position: number;
}

const RankingItem = ({ user, position }: RankingItemProps) => {
  const navigate = useNavigate(); // 🕹️ Hook para la navegación programática
  const isPodium = position <= 3;

  const getPodiumColor = (pos: number) => {
    if (pos === 1) return "text-[#f3db6b]";
    if (pos === 2) return "text-[#cbd5e1]";
    if (pos === 3) return "text-[#e07a44]";
    return "text-border-retro/80";
  };

  const nameColorClass = getPodiumColor(position);

  return (
    <tr
      onClick={() => navigate(`/prode/${user.id}`)} // 👈 Redirección en toda la fila
      className="transition-colors hover:bg-primary/10 border-b-4 border-border-retro last:border-b-0 cursor-pointer select-none"
    >
      {/* Columna Puesto / Medalla */}
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
          {!isPodium && (
            <span className="text-2xl font-black tracking-tighter text-secondary">
              {position.toString().padStart(2, "0")}
            </span>
          )}
        </div>
      </td>

      {/* Columna Nombre de Usuario */}
      <td
        className={`py-2 px-6 text-lg font-black tracking-wide uppercase ${nameColorClass}`}
      >
        <span className="block w-full">{user.username}</span>
      </td>

      {/* Columna Aciertos */}
      <td className="py-2 px-6 text-center text-xl font-black text-[#34d399]">
        {user.correctPredictions.toString().padStart(2, "0")}
      </td>

      {/* Columna Puntos */}
      <td className="py-2 px-6 text-right text-2xl font-black text-[#34d399]">
        {user.totalPoints.toString().padStart(2, "0")}
      </td>
    </tr>
  );
};

export default RankingItem;
