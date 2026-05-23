import type { PredictionChoice } from "../../types/index";

interface PredictionButtonProps {
  choice: PredictionChoice;
  label: string;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export const PredictionButton = ({
  choice,
  label,
  isSelected,
  isDisabled,
  onClick,
}: PredictionButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`h-12 min-w-[56px] px-2 border-4 border-border-retro font-black text-xs flex items-center justify-center transition-all uppercase select-none cursor-pointer disabled:cursor-not-allowed ${
        isDisabled
          ? "opacity-50 bg-slate-100 text-slate-400"
          : isSelected
            ? "bg-[#f3db6b] text-slate-900 shadow-[inset_3px_3px_0px_rgba(0,0,0,0.25)] translate-x-[1px] translate-y-[1px]"
            : "bg-bg-main hover:bg-slate-200 dark:hover:bg-slate-700 shadow-[3px_3px_0px_0px_var(--color-border-retro)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_var(--color-border-retro)]"
      }`}
    >
      {label}
    </button>
  );
};

export default PredictionButton;
