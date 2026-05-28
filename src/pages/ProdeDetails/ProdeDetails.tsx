import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { PredictionChoice, RankingUser, Match } from "../../types/types";
import ProdeHeader from "../../components/ProdeHeader/ProdeHeader";
import ProdeStages from "../../components/ProdeStages/ProdeStages";
import { getUserDetails } from "../../services/userService";
import { getAllMatches } from "../../services/matchService";
import {
  getUserPredictions,
  saveUserPredictions,
} from "../../services/predictionService";
import { useAuth } from "../../contexts/AuthContext";

const ProdeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();

  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<
    Record<string, PredictionChoice>
  >({});
  const [playerData, setPlayerData] = useState<{
    user: RankingUser;
    position: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const isOwnProde = currentUser?.id === id;

  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;

      setLoading(true);

      const [detailsData, savedPredictions, dbMatches] = await Promise.all([
        getUserDetails(id),
        getUserPredictions(id),
        getAllMatches(),
      ]);

      setPlayerData(detailsData);
      setPredictions(savedPredictions);
      setMatches(dbMatches);
      setLoading(false);
    };

    fetchAllData();
  }, [id]);

  const handlePredict = (matchId: string, choice: PredictionChoice) => {
    if (!isOwnProde) return;

    setPredictions((prev) => ({
      ...prev,
      [matchId]: prev[matchId] === choice ? prev[matchId] : choice,
    }));
  };

  const handleSaveClick = async () => {
    if (!id || !isOwnProde) return;

    setIsSaving(true);
    setSaveMessage(null);

    const success = await saveUserPredictions(id, predictions);

    if (success) {
      setSaveMessage({
        text: "PREDICCIONES GUARDADAS CON ÉXITO!",
        isError: false,
      });
      setTimeout(() => setSaveMessage(null), 3000);
    } else {
      setSaveMessage({
        text: "ERROR AL GUARDAR. INTENTE NUEVAMENTE",
        isError: true,
      });
    }
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center font-mono uppercase font-black text-secondary w-full">
        Cargando Jugador y Fixture...
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center font-mono w-full">
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
      </div>
    );
  }

  return (
  <div className="max-w-4xl mx-auto px-4 py-12 font-mono select-none w-full">
    <ProdeHeader user={playerData.user} position={playerData.position} />

    <ProdeStages
      matches={matches}
      predictions={predictions}
      onPredict={handlePredict}
      isOwnProde={isOwnProde}
      isSaving={isSaving}
      saveMessage={saveMessage}
      onSave={handleSaveClick}
    />
  </div>
  );
};

export default ProdeDetails;