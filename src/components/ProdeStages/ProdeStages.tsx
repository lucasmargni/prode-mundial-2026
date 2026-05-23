import { useState } from "react";
import type {
  TournamentStage,
  PredictionChoice,
  Match,
  StageStatus,
} from "../../types/index";
import MatchCard from "../MatchCard/MatchCard";

const stagesMock: StageStatus[] = [
  { id: "GRUPOS", name: "GRUPOS", isAvailable: true, lockDate: "2026-06-10" },
  { id: "16VOS", name: "16VOS", isAvailable: true, lockDate: "2026-06-20" },
  { id: "8VOS", name: "8VOS", isAvailable: true, lockDate: "2026-06-25" },
  {
    id: "CUARTOS",
    name: "CUARTOS",
    isAvailable: false,
    lockDate: "2026-07-02",
  },
  {
    id: "SEMIFINAL",
    name: "SEMIFINAL",
    isAvailable: false,
    lockDate: "2026-07-08",
  },
  {
    id: "TERCER_PUESTO",
    name: "3ER PUESTO",
    isAvailable: false,
    lockDate: "2026-07-11",
  },
  { id: "FINAL", name: "FINAL", isAvailable: false, lockDate: "2026-07-12" },
];

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
  const [activeStage, setActiveStage] = useState<TournamentStage>("GRUPOS");

  const currentMatches = matchesMock.filter(
    (match) => match.stage === activeStage,
  );

  return (
    <>
      <nav className="flex flex-wrap gap-2 mb-8">
        {stagesMock.map((stage) => {
          const isActive = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              disabled={!stage.isAvailable}
              onClick={() => setActiveStage(stage.id)}
              className={`border-4 border-border-retro font-black text-xs px-4 py-2 uppercase transition-all duration-150 cursor-pointer disabled:cursor-not-allowed ${
                !stage.isAvailable
                  ? "opacity-40 bg-slate-200 dark:bg-slate-800 text-slate-400"
                  : isActive
                    ? "bg-primary text-white shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.2)] translate-x-[2px] translate-y-[2px]"
                    : "bg-bg-card shadow-[4px_4px_0px_0px_var(--color-border-retro)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_var(--color-border-retro)]"
              }`}
            >
              {stage.name}
            </button>
          );
        })}
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
