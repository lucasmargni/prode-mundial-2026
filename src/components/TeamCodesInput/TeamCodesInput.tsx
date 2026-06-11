interface TeamCodesInputProps {
  localTeamCode: string;
  awayTeamCode: string;
  onLocalChange: (code: string) => void;
  onAwayChange: (code: string) => void;
}

const TeamCodesInput = ({
  localTeamCode,
  awayTeamCode,
  onLocalChange,
  onAwayChange,
}: TeamCodesInputProps) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-xs font-bold uppercase text-secondary mb-1">
        Local (Código)
      </label>
      <input
        required
        placeholder="ARG"
        className="w-full p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors"
        value={localTeamCode}
        onChange={(e) => onLocalChange(e.target.value.toUpperCase())}
      />
    </div>
    <div>
      <label className="block text-xs font-bold uppercase text-secondary mb-1">
        Visitante (Código)
      </label>
      <input
        required
        placeholder="BRA"
        className="w-full p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors"
        value={awayTeamCode}
        onChange={(e) => onAwayChange(e.target.value.toUpperCase())}
      />
    </div>
  </div>
);

export default TeamCodesInput;
