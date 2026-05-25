import { useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { createNewMatch } from "../../services/matchService";
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

const CreateMatchModal = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
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
    try {
      await createNewMatch(formData);
      setSuccess(true);
      setTimeout(() => onClose(), 1500); // Se cierra solo tras mostrar el éxito
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado al guardar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper title="Agregar Nuevo Partido" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Notificaciones In-Form */}
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

        <div>
          <label className="block text-xs font-bold uppercase text-secondary mb-1">
            ID Único (ej: match-01)
          </label>
          <input
            required
            className="w-full p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-secondary mb-1">
              Local (Código)
            </label>
            <input
              required
              placeholder="ARG"
              className="w-full p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors"
              value={formData.localTeamCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  localTeamCode: e.target.value.toUpperCase(),
                })
              }
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
              value={formData.awayTeamCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  awayTeamCode: e.target.value.toUpperCase(),
                })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-secondary mb-1">
            Etapa
          </label>
          <select
            className="w-full p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors cursor-pointer"
            value={formData.stage}
            onChange={(e) =>
              setFormData({
                ...formData,
                stage: e.target.value as TournamentStage,
              })
            }
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-secondary mb-1">
            Fecha y Hora (UTC)
          </label>
          <input
            required
            type="datetime-local"
            className="w-full p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

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
