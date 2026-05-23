import type { TournamentStage, StageStatus } from "../../types/types";

interface StageButtonProps {
  stage: StageStatus;
  isActive: boolean;
  todayStr: string;
  onClick: (id: TournamentStage) => void;
}

export const StageButton = ({
  stage,
  isActive,
  todayStr,
  onClick,
}: StageButtonProps) => {
  const isAvailable = todayStr < stage.lockDate;

  const baseStyles =
    "border-4 font-black text-xs px-4 py-2 uppercase transition-all duration-150 cursor-pointer select-none";

  const getVariantStyles = () => {
    if (isActive) {
      return "bg-primary text-white border-border-retro shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.2)] translate-x-[2px] translate-y-[2px]";
    }

    if (!isAvailable) {
      return "opacity-70 bg-slate-200 dark:bg-slate-800 text-slate-500 border-dashed border-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]";
    }

    return "bg-bg-card border-border-retro text-border-retro hover:bg-primary/10 hover:border-primary shadow-[4px_4px_0px_0px_var(--color-border-retro)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_var(--color-border-retro)]";
  };

  return (
    <button
      onClick={() => onClick(stage.id)}
      className={`${baseStyles} ${getVariantStyles()}`}
    >
      {stage.name}
    </button>
  );
};

export default StageButton;
