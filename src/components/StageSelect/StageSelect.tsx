import type { TournamentStage } from "../../types/types";

const STAGES: TournamentStage[] = [
  "GRUPOS",
  "16VOS",
  "8VOS",
  "CUARTOS",
  "SEMIFINAL",
  "TERCER_PUESTO",
  "FINAL",
];

interface StageSelectProps {
  value: TournamentStage;
  onChange: (stage: TournamentStage) => void;
}

const StageSelect = ({ value, onChange }: StageSelectProps) => (
  <div>
    <label className="block text-xs font-bold uppercase text-secondary mb-1">
      Etapa
    </label>
    <select
      className="w-full p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value as TournamentStage)}
    >
      {STAGES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  </div>
);

export default StageSelect;
