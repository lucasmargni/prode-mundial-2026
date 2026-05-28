/* src/components/SavePredictionButton/SavePredictionButton.tsx */
interface SavePredictionButtonProps {
  isSaving: boolean;
  saveMessage: { text: string; isError: boolean } | null;
  onSave: () => void;
}

export const SavePredictionButton = ({
  isSaving,
  saveMessage,
  onSave,
}: SavePredictionButtonProps) => {
  return (
    <div className="w-full flex flex-col items-center space-y-4 border-b-4 border-dashed border-border-retro/40 pb-8 mb-8">
      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full sm:w-auto min-w-[280px] border-4 border-border-retro bg-primary text-white px-8 py-4 font-black uppercase tracking-wider text-lg shadow-[6px_6px_0px_0px_var(--color-border-retro)] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_var(--color-border-retro)] cursor-pointer"
      >
        {isSaving ? "GUARDANDO JUGADAS..." : "GUARDAR PREDICCIONES"}
      </button>

      {saveMessage && (
        <p
          className={`text-sm font-black uppercase tracking-widest animate-pulse ${
            saveMessage.isError ? "text-[#e63946]" : "text-emerald-500"
          }`}
        >
          {saveMessage.text}
        </p>
      )}
    </div>
  );
};

export default SavePredictionButton;