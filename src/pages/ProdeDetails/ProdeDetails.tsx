import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { PredictionChoice, RankingUser } from "../../types/types";
import ProdeHeader from "../../components/ProdeHeader/ProdeHeader";
import ProdeStages from "../../components/ProdeStages/ProdeStages";
import { getUserDetails } from "../../services/userService";

const ProdeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [predictions, setPredictions] = useState<
    Record<string, PredictionChoice>
  >({});

  const [playerData, setPlayerData] = useState<{
    user: RankingUser;
    position: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;

      setLoading(true);
      const data = await getUserDetails(id);
      setPlayerData(data);
      setLoading(false);
    };

    fetchUserData();
  }, [id]);

  const handlePredict = (matchId: string, choice: PredictionChoice) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: prev[matchId] === choice ? prev[matchId] : choice,
    }));
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center font-mono uppercase font-black text-secondary">
        Cargando Jugador...
      </main>
    );
  }

  if (!playerData) {
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
          className="inline-block border-4 border-border-retro bg-bg-card px-6 py-3 font-black uppercase text-sm shadow-[4px_4px_0px_0px_var(--color-border-retro)] active:translate-x-[2px] active:translate-y-[2px]"
        >
          VOLVER AL RANKING
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 font-mono select-none">
      <ProdeHeader user={playerData.user} position={playerData.position} />
      <ProdeStages predictions={predictions} onPredict={handlePredict} />
    </main>
  );
};

export default ProdeDetails;
