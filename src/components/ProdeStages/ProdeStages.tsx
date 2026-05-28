import { useState } from "react";
import type {
  TournamentStage,
  PredictionChoice,
  Match,
} from "../../types/types";
import { STAGES_DATA } from "../../constants/stages";
import MatchCard from "../MatchCard/MatchCard";
import StageButton from "../StageButton/StageButton";
import SavePredictionButton from "../SavePredictionButton/SavePredictionButton";

interface ProdeStagesProps {
  matches: Match[];
  predictions: Record<string, PredictionChoice>;
  onPredict: (matchId: string, choice: PredictionChoice) => void;
  isOwnProde: boolean;
  isSaving: boolean;
  saveMessage: { text: string; isError: boolean } | null;
  onSave: () => void;
}

export const ProdeStages = ({
  matches,
  predictions,
  onPredict,
  isOwnProde,
  isSaving,
  saveMessage,
  onSave,
}: ProdeStagesProps) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const [activeStage, setActiveStage] = useState<TournamentStage>(() => {
    const currentStage = STAGES_DATA.find((s) => s.lockDate >= todayStr);
    return currentStage ? (currentStage.id as TournamentStage) : "FINAL";
  });

  const currentStageData = STAGES_DATA.find((s) => s.id === activeStage);
  const isStageExpired = currentStageData
    ? todayStr >= currentStageData.lockDate
    : false;

  const filteredMatches = matches.filter(
    (match) => match.stage === activeStage,
  );

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

      {isOwnProde && (
        <SavePredictionButton
          isSaving={isSaving}
          saveMessage={saveMessage}
          onSave={onSave}
        />
      )}

      <section className="space-y-6">
        {filteredMatches.length === 0 ? (
          <div className="text-center p-8 border-4 border-dashed border-border-retro/30 bg-bg-card/50">
            <p className="font-black text-secondary uppercase">
              NO HAY PARTIDOS CARGADOS PARA ESTA ETAPA
            </p>
          </div>
        ) : (
          filteredMatches.map((match) => (
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