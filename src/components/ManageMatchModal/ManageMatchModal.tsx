import { useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { submitMatchResult, getAllMatches } from "../../services/matchService";
import { computeScoresAndPositionsAfterMatch } from "../../services/userService";
import type { Match } from "../../types/types";
import MatchSearchInput from "../MatchSearchInput/MatchSearchInput";
import MatchHeader from "../MatchHeader/MatchHeader";
import GoalsGrid from "../GoalsGrid/GoalsGrid";
import PenaltiesSection from "../PenaltiesSection/PenaltiesSection";

const ManageMatchModal = ({ onClose }: { onClose: () => void }) => {
  const [matchId, setMatchId] = useState("");
  const [matchData, setMatchData] = useState<Match | null>(null);
  const [goals, setGoals] = useState({ local: "", away: "" });
  const [penalties, setPenalties] = useState({ local: "", away: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const localGoalsNum = parseInt(goals.local);
  const awayGoalsNum = parseInt(goals.away);

  const isDraw =
    !isNaN(localGoalsNum) &&
    !isNaN(awayGoalsNum) &&
    localGoalsNum === awayGoalsNum;

  const needsPenalties = !!matchData && matchData.stage !== "GRUPOS" && isDraw;

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

    let penaltyLocal: number | undefined;
    let penaltyAway: number | undefined;

    if (needsPenalties) {
      penaltyLocal = parseInt(penalties.local);
      penaltyAway = parseInt(penalties.away);

      if (isNaN(penaltyLocal) || isNaN(penaltyAway)) {
        setError(
          "Debes ingresar la cantidad de penales convertidos por cada equipo.",
        );
        return;
      }

      if (penaltyLocal === penaltyAway) {
        setError("Los penales no pueden terminar en empate.");
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      setStatusMessage("Guardando resultado del partido...");
      const closedMatch = await submitMatchResult(
        matchData.id,
        localG,
        awayG,
        matchData.stage,
        penaltyLocal,
        penaltyAway,
      );

      setStatusMessage(
        "Calculando aciertos y reordenando posiciones del ranking global...",
      );
      await computeScoresAndPositionsAfterMatch(closedMatch);

      setSuccess(true);
      setStatusMessage("¡Cómputos finalizados con éxito!");
      setTimeout(() => onClose(), 1500);
    } catch (err: any) {
      setError(err.message || "Error al procesar la secuencia de cómputos.");
    } finally {
      setLoading(false);
      setStatusMessage("");
    }
  };

  return (
    <ModalWrapper title="Cargar Resultado Real" onClose={onClose}>
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-xl font-medium">
            {error}
          </div>
        )}

        {loading && statusMessage && (
          <div className="p-3 bg-secondary/10 border border-secondary/30 text-secondary text-sm rounded-xl font-medium animate-pulse">
            {statusMessage}
          </div>
        )}

        {success && (
          <div className="p-3 bg-primary/10 border border-primary/30 text-primary text-sm rounded-xl font-medium">
            {statusMessage}
          </div>
        )}

        {!matchData ? (
          <MatchSearchInput
            matchId={matchId}
            onChange={setMatchId}
            onSearch={handleSearch}
            loading={loading}
          />
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <MatchHeader
              localTeam={matchData.localTeam}
              awayTeam={matchData.awayTeam}
            />

            <GoalsGrid
              localLabel="GOLES LOCAL"
              awayLabel="GOLES VISITANTE"
              localValue={goals.local}
              awayValue={goals.away}
              onLocalChange={(v) => setGoals({ ...goals, local: v })}
              onAwayChange={(v) => setGoals({ ...goals, away: v })}
            />

            {needsPenalties && (
              <PenaltiesSection
                penalties={penalties}
                onChange={setPenalties}
              />
            )}

            <button
              disabled={loading || success}
              type="submit"
              className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading
                ? "Ejecutando Secuencia..."
                : "Confirmar y Cerrar Partido"}
            </button>
          </form>
        )}
      </div>
    </ModalWrapper>
  );
};

export default ManageMatchModal;
