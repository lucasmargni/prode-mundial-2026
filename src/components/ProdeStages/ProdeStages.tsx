import { useState, useEffect } from "react";
import type {
  TournamentStage,
  PredictionChoice,
  Match,
} from "../../types/types";
import { STAGES_DATA } from "../../constants/stages";
import { getMatchesByStage } from "../../services/matchService";
import MatchCard from "../MatchCard/MatchCard";
import StageButton from "../StageButton/StageButton";

interface ProdeStagesProps {
  predictions: Record<string, PredictionChoice>;
  onPredict: (matchId: string, choice: PredictionChoice) => void;
}

export const ProdeStages = ({ predictions, onPredict }: ProdeStagesProps) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const [activeStage, setActiveStage] = useState<TournamentStage>(() => {
    const currentStage = STAGES_DATA.find((s) => s.lockDate >= todayStr);
    return currentStage ? (currentStage.id as TournamentStage) : "FINAL";
  });

  const [currentMatches, setCurrentMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Buscamos la fecha de la etapa actual para saber si ya expiró
  const currentStageData = STAGES_DATA.find((s) => s.id === activeStage);
  const isStageExpired = currentStageData
    ? todayStr >= currentStageData.lockDate
    : false;

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const matches = await getMatchesByStage(activeStage);
      setCurrentMatches(matches);
      setLoading(false);
    };

    fetchMatches();
  }, [activeStage]);

  return (
    <>
      <nav className="flex flex-wrap justify-center gap-2 mb-8">
        {STAGES_DATA.map((stage) => (
          <StageButton
            key={stage.id}
            stage={stage}
            isActive={activeStage === stage.id}
            todayStr={todayStr}
            onClick={setActiveStage}
          />
        ))}
      </nav>

      <section className="space-y-6">
        {loading ? (
          <div className="text-center p-8 font-black text-secondary uppercase animate-pulse">
            Cargando Partidos...
          </div>
        ) : currentMatches.length === 0 ? (
          <div className="text-center p-8 border-4 border-dashed border-border-retro/30 bg-bg-card/50">
            <p className="font-black text-secondary uppercase">
              NO HAY PARTIDOS CARGADOS PARA ESTA ETAPA
            </p>
          </div>
        ) : (
          currentMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              userChoice={predictions[match.id]}
              onPredict={onPredict}
              isLocked={isStageExpired}
            />
          ))
        )}
      </section>
    </>
  );
};

export default ProdeStages;
