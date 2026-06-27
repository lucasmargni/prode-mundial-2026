import { useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { createNewMatch } from "../../services/matchService";
import type { TournamentStage } from "../../types/types";
import TeamCodesInput from "../TeamCodesInput/TeamCodesInput";
import StageSelect from "../StageSelect/StageSelect";
import MatchDateInput from "../MatchDateInput/MatchDateInput";

const CreateMatchModal = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    stage: "GRUPOS" as TournamentStage,
    localTeamCode: "",
    awayTeamCode: "",
    date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const id = `${formData.localTeamCode.toLowerCase()}-${formData.awayTeamCode.toLowerCase()}`;
    try {
      await createNewMatch({ ...formData, id });
      setSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado al guardar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper title="Agregar Nuevo Partido" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-xl font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-primary/10 border border-primary/30 text-primary text-sm rounded-xl font-medium">
            Partido creado de forma exitosa. Cerrando...
          </div>
        )}

        <TeamCodesInput
          localTeamCode={formData.localTeamCode}
          awayTeamCode={formData.awayTeamCode}
          onLocalChange={(v) => setFormData({ ...formData, localTeamCode: v })}
          onAwayChange={(v) => setFormData({ ...formData, awayTeamCode: v })}
        />

        <StageSelect
          value={formData.stage}
          onChange={(v) => setFormData({ ...formData, stage: v })}
        />

        <MatchDateInput
          value={formData.date}
          onChange={(v) => setFormData({ ...formData, date: v })}
        />

        <button
          disabled={loading || success}
          type="submit"
          className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
        >
          {loading ? "Guardando..." : "Crear Partido"}
        </button>
      </form>
    </ModalWrapper>
  );
};

export default CreateMatchModal;
