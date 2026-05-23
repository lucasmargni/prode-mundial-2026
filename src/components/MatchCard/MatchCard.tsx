import type { Match, PredictionChoice } from "../../types/types";
import CountryMatchCard from "../CountryMatchCard/CountryMatchCard";
import PredictionButton from "../PredictionButton/PredictionButton";

interface MatchCardProps {
  match: Match;
  userChoice?: PredictionChoice;
  onPredict: (matchId: string, choice: PredictionChoice) => void;
  isLocked: boolean;
}

export const MatchCard = ({
  match,
  userChoice,
  onPredict,
  isLocked,
}: MatchCardProps) => {
  const buttonOptions = [
    { choice: "L" as PredictionChoice, label: match.localTeam.code },
    { choice: "E" as PredictionChoice, label: "EMPATE" },
    { choice: "V" as PredictionChoice, label: match.awayTeam.code },
  ];

  const disableButtons = match.isFinished || isLocked;

  return (
    <div className="border-4 border-border-retro bg-bg-card p-4 shadow-[4px_4px_0px_0px_var(--color-border-retro)] flex flex-col md:flex-row items-center justify-between gap-6 relative bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:16px_16px]">
      <div className="absolute top-2 left-4 text-[10px] font-black text-secondary/70 uppercase tracking-tighter">
        {match.date} {match.isFinished && "• [TERMINADO]"}{" "}
        {!match.isFinished && isLocked && "• [VOTO CERRADO]"}
      </div>

      <div className="flex items-center justify-center w-full md:w-auto mt-5 md:mt-2">
        <CountryMatchCard team={match.localTeam} />

        <div className="flex items-center justify-center px-2 shrink-0">
          <div className="border-2 border-border-retro bg-bg-main px-3 py-1 font-black text-sm tracking-tight min-w-[75px] text-center shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]">
            {match.isFinished ? (
              <span className="text-primary">
                {match.realGoalsLocal} - {match.realGoalsAway}
              </span>
            ) : (
              <span className="text-secondary/60">VS</span>
            )}
          </div>
        </div>

        <CountryMatchCard team={match.awayTeam} />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto justify-center shrink-0">
        {buttonOptions.map((option) => (
          <PredictionButton
            key={option.choice}
            choice={option.choice}
            label={option.label}
            isSelected={userChoice === option.choice}
            isLocked={disableButtons}
            onClick={() => onPredict(match.id, option.choice)}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchCard;
