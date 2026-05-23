import { useState } from "react";
import type {
  TournamentStage,
  PredictionChoice,
  Match,
} from "../../types/index";
import { STAGES_DATA } from "../../constants/stages";
import MatchCard from "../MatchCard/MatchCard";
import StageButton from "../StageButton/StageButton";

const matchesMock: Match[] = [
  {
    id: "m1",
    stage: "GRUPOS",
    localTeam: { id: "t1", name: "ARGENTINA", code: "ARG", flagUrl: "🇦🇷" },
    awayTeam: { id: "t2", name: "FRANCIA", code: "FRA", flagUrl: "🇫🇷" },
    date: "24 MAY - 16:00 HS",
    isFinished: true,
    realGoalsLocal: 3,
    realGoalsAway: 2,
    realResult: "L",
  },
  {
    id: "m2",
    stage: "GRUPOS",
    localTeam: { id: "t3", name: "URUGUAY", code: "URU", flagUrl: "🇺🇾" },
    awayTeam: { id: "t4", name: "PORTUGAL", code: "POR", flagUrl: "🇵🇹" },
    date: "25 MAY - 13:00 HS",
    isFinished: false,
  },
  {
    id: "m3",
    stage: "16VOS",
    localTeam: { id: "t5", name: "ESPAÑA", code: "ESP", flagUrl: "🇪🇸" },
    awayTeam: { id: "t6", name: "JAPÓN", code: "JPN", flagUrl: "🇯🇵" },
    date: "18 JUN - 15:00 HS",
    isFinished: false,
  },
  {
    id: "m4",
    stage: "8VOS",
    localTeam: { id: "t1", name: "ARGENTINA", code: "ARG", flagUrl: "🇦🇷" },
    awayTeam: { id: "t7", name: "ITALIA", code: "ITA", flagUrl: "🇮🇹" },
    date: "29 JUN - 20:00 HS",
    isFinished: false,
  },
];

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

  const currentMatches = matchesMock.filter(
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

      <section className="space-y-6">
        {currentMatches.length === 0 ? (
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
            />
          ))
        )}
      </section>
    </>
  );
};

export default ProdeStages;
