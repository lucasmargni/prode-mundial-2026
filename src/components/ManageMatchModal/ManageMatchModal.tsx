import { useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { submitMatchResult, getAllMatches } from "../../services/matchService";
import { teamDictionary } from "../../utils/teams";
import type { Match } from "../../types/types";

const ManageMatchModal = ({ onClose }: { onClose: () => void }) => {
  const [matchId, setMatchId] = useState("");
  const [matchData, setMatchData] = useState<Match | null>(null);
  const [goals, setGoals] = useState({ local: "", away: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSearch = async () => {
    if (!matchId.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const all = await getAllMatches();
      const found = all.find(
        (m) => m.id.toLowerCase() === matchId.trim().toLowerCase(),
      );
      if (!found)
        throw new Error("No existe ningún partido registrado con ese ID.");
      if (found.isFinished)
        throw new Error("Este partido ya fue cerrado y computado.");
      setMatchData(found);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchData) return;

    const localG = parseInt(goals.local);
    const awayG = parseInt(goals.away);

    if (isNaN(localG) || isNaN(awayG)) {
      setError("Debes ingresar una cantidad de goles válida.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await submitMatchResult(matchData.id, localG, awayG, matchData.stage);
      setSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch (err: any) {
      setError(err.message || "Error al procesar el cierre del partido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper title="Cargar Resultado Real" onClose={onClose}>
      <div className="space-y-4">
        {/* Renderizado de errores e impactos en el formulario */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-xl font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-primary/10 border border-primary/30 text-primary text-sm rounded-xl font-medium">
            Resultados guardados y puntos computados con éxito.
          </div>
        )}

        {!matchData ? (
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase text-secondary">
              Ingresá el ID del Partido
            </label>
            <div className="flex space-x-2">
              <input
                className="flex-1 p-2 rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors"
                value={matchId}
                onChange={(e) => setMatchId(e.target.value)}
                placeholder="ej: match-01..."
              />
              <button
                disabled={loading}
                onClick={handleSearch}
                className="px-5 bg-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center justify-between text-center bg-bg-main border border-secondary/10 p-4 rounded-xl">
              <div className="flex-1">
                {/* Obtenemos el emoji de bandera directamente del diccionario */}
                <span
                  className="text-3xl block mb-1"
                  role="img"
                  aria-label={matchData.localTeam.name}
                >
                  {teamDictionary[matchData.localTeam.code]?.flagUrl || "🏳️"}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-border-retro">
                  {matchData.localTeam.name}
                </p>
              </div>
              <div className="px-4 font-black text-xl text-primary tracking-widest">
                VS
              </div>
              <div className="flex-1">
                <span
                  className="text-3xl block mb-1"
                  role="img"
                  aria-label={matchData.awayTeam.name}
                >
                  {teamDictionary[matchData.awayTeam.code]?.flagUrl || "🏳️"}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-border-retro">
                  {matchData.awayTeam.name}
                </p>
              </div>
            </div>

            {/* Carga manual pura sin controles nativos de flechas */}
            <div className="grid grid-cols-2 gap-8 justify-items-center">
              <div className="text-center">
                <label className="block text-xs font-bold text-secondary mb-2">
                  GOLES LOCAL
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  // Clases Tailwind para remover flechas (appearance-none)
                  className="w-20 h-14 text-center text-2xl font-black rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={goals.local}
                  onChange={(e) =>
                    setGoals({ ...goals, local: e.target.value })
                  }
                />
              </div>
              <div className="text-center">
                <label className="block text-xs font-bold text-secondary mb-2">
                  GOLES VISITANTE
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-20 h-14 text-center text-2xl font-black rounded-xl border border-secondary/20 bg-bg-main text-border-retro outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={goals.away}
                  onChange={(e) => setGoals({ ...goals, away: e.target.value })}
                />
              </div>
            </div>

            <button
              disabled={loading || success}
              type="submit"
              className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading
                ? "Procesando cómputos..."
                : "Confirmar y Cerrar Partido"}
            </button>
          </form>
        )}
      </div>
    </ModalWrapper>
  );
};

export default ManageMatchModal;
