interface MatchDateInputProps {
  value: string;
  onChange: (date: string) => void;
}

const MatchDateInput = ({ value, onChange }: MatchDateInputProps) => (
  <div>
    <label className="block text-xs font-bold uppercase text-secondary mb-1">
      Fecha y Hora (UTC)
    </label>
    <input
      required
      type="datetime-local"
      className="w-full p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default MatchDateInput;
