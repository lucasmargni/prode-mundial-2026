import GoalsGrid from "../GoalsGrid/GoalsGrid";

interface PenaltiesSectionProps {
  penalties: { local: string; away: string };
  onChange: (penalties: { local: string; away: string }) => void;
}

const PenaltiesSection = ({ penalties, onChange }: PenaltiesSectionProps) => {
  const showTieWarning =
    penalties.local !== "" &&
    penalties.away !== "" &&
    parseInt(penalties.local) === parseInt(penalties.away);

  return (
    <div className="space-y-3">
      <p className="text-center text-xs font-bold uppercase text-secondary">
        Empate en fase eliminatoria — Cargar definición por penales
      </p>
      <GoalsGrid
        localLabel="PENALES LOCAL"
        awayLabel="PENALES VISITANTE"
        localValue={penalties.local}
        awayValue={penalties.away}
        onLocalChange={(v) => onChange({ ...penalties, local: v })}
        onAwayChange={(v) => onChange({ ...penalties, away: v })}
      />
      {showTieWarning && (
        <p className="text-center text-xs font-bold text-red-500">
          Los penales no pueden terminar en empate.
        </p>
      )}
    </div>
  );
};

export default PenaltiesSection;
