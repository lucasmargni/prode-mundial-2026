import type { PredictionChoice } from "../../types/types";

interface PredictionButtonProps {
  choice: PredictionChoice;
  label: string;
  isSelected: boolean;
  isLocked: boolean;
  onClick: () => void;
}

export const PredictionButton = ({
  label,
  isSelected,
  isLocked,
  onClick,
}: PredictionButtonProps) => {
  const interactiveClasses = isLocked
    ? "pointer-events-none cursor-default"
    : "cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_var(--color-border-retro)]";

  const getVisualStyles = () => {
    if (isSelected) {
      return "bg-[#f3db6b] text-slate-900 border-border-retro shadow-[inset_3px_3px_0px_rgba(0,0,0,0.25)] translate-x-[1px] translate-y-[1px]";
    }

    if (isLocked) {
      return "bg-bg-main border-border-retro/40 text-border-retro/40 opacity-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.05)]";
    }

    return "bg-bg-main hover:bg-slate-200 dark:hover:bg-slate-700 border-border-retro text-border-retro shadow-[3px_3px_0px_0px_var(--color-border-retro)]";
  };

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      className={`h-12 min-w-[56px] px-2 border-4 font-black text-xs flex items-center justify-center transition-all uppercase select-none ${interactiveClasses} ${getVisualStyles()}`}
    >
      {label}
    </button>
  );
};

export default PredictionButton;
