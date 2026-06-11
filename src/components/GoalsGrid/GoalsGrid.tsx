const INPUT_CLASS =
  "w-20 h-14 text-center text-2xl font-black rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

interface GoalsGridProps {
  localLabel: string;
  awayLabel: string;
  localValue: string;
  awayValue: string;
  onLocalChange: (v: string) => void;
  onAwayChange: (v: string) => void;
}

const GoalsGrid = ({
  localLabel,
  awayLabel,
  localValue,
  awayValue,
  onLocalChange,
  onAwayChange,
}: GoalsGridProps) => (
  <div className="grid grid-cols-2 gap-8 justify-items-center">
    <div className="text-center">
      <label className="block text-xs font-bold text-secondary mb-2">
        {localLabel}
      </label>
      <input
        type="number"
        min="0"
        required
        className={INPUT_CLASS}
        value={localValue}
        onChange={(e) => onLocalChange(e.target.value)}
      />
    </div>
    <div className="text-center">
      <label className="block text-xs font-bold text-secondary mb-2">
        {awayLabel}
      </label>
      <input
        type="number"
        min="0"
        required
        className={INPUT_CLASS}
        value={awayValue}
        onChange={(e) => onAwayChange(e.target.value)}
      />
    </div>
  </div>
);

export default GoalsGrid;
