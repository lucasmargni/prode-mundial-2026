import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { PredictionChoice } from "../../types/index";
import ProdeHeader from "../../components/ProdeHeader/ProdeHeader";
import ProdeStages from "../../components/ProdeStages/ProdeStages";

const rankingMock = [
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

const ProdeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [predictions, setPredictions] = useState<
    Record<string, PredictionChoice>
  >({});

  const playerIndex = rankingMock.findIndex((user) => user.id === id);
  const currentPlayer = playerIndex !== -1 ? rankingMock[playerIndex] : null;

  const handlePredict = (matchId: string, choice: PredictionChoice) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: prev[matchId] === choice ? prev[matchId] : choice,
    }));
  };

  if (!currentPlayer) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center font-mono">
        <h1 className="text-3xl font-black text-[#e63946] uppercase mb-4">
          JUGADOR NO ENCONTRADO
        </h1>
        <p className="text-xl font-bold uppercase text-secondary mb-8">
          EL IDENTIFICADOR DE USUARIO NO EXISTE
        </p>
        <Link
          to="/"
          className="inline-block border-4 border-border-retro bg-bg-card px-6 py-3 font-black uppercase text-sm shadow-[4px_4px_0px_0px_var(--color-border-retro)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_var(--color-border-retro)]"
        >
          VOLVER AL RANKING
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 font-mono select-none">
      <ProdeHeader user={currentPlayer} position={playerIndex + 1} />

      <ProdeStages predictions={predictions} onPredict={handlePredict} />
    </main>
  );
};

export default ProdeDetails;
