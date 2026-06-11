interface MatchSearchInputProps {
  matchId: string;
  onChange: (id: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const MatchSearchInput = ({ matchId, onChange, onSearch, loading }: MatchSearchInputProps) => (
  <div className="space-y-3">
    <label className="block text-xs font-bold uppercase text-secondary">
      Ingresá el ID del Partido
    </label>
    <div className="flex space-x-2">
      <input
        className="flex-1 p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors"
        value={matchId}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ej: match-01..."
      />
      <button
        disabled={loading}
        onClick={onSearch}
        className="px-5 bg-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
      >
        Buscar
      </button>
    </div>
  </div>
);

export default MatchSearchInput;