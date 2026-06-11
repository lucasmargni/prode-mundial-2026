interface MatchIdInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MatchIdInput = ({ value, onChange }: MatchIdInputProps) => (
  <div>
    <label className="block text-xs font-bold uppercase text-secondary mb-1">
      ID Único (ej: match-01)
    </label>
    <input
      required
      className="w-full p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default MatchIdInput;
