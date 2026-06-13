import { useState } from "react";

interface DeleteUserButtonProps {
  username: string;
  onDelete: () => Promise<void>;
}

const DeleteUserButton = ({ username, onDelete }: DeleteUserButtonProps) => {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    await onDelete();
    setDeleting(false);
  };

  return (
    <>
      <button
        onClick={() => setConfirming(true)}
        title="Eliminar usuario"
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-secondary/40 hover:text-[#e63946] border-2 border-transparent hover:border-[#e63946]/40 transition-colors cursor-pointer font-black text-sm leading-none"
      >
        ✕
      </button>

      {confirming && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !deleting && setConfirming(false)}
          />

          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-bg-card shadow-2xl border-2 border-[#e63946]/60 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 border-[#e63946]/20 bg-[#e63946]/10">
              <h3 className="text-base font-black uppercase tracking-wide text-[#e63946]">
                Eliminar usuario
              </h3>
              <button
                onClick={() => !deleting && setConfirming(false)}
                disabled={deleting}
                className="p-1 hover:bg-[#e63946]/10 rounded-full cursor-pointer transition-colors disabled:opacity-50"
              >
                ❌
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <p className="text-sm text-secondary leading-relaxed">
                ¿Estás seguro que querés eliminar a{" "}
                <span className="font-black text-border-retro uppercase">
                  {username}
                </span>
                ? Esta acción es irreversible y borrará todas sus predicciones.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleConfirm}
                  disabled={deleting}
                  className="flex-1 py-3 bg-[#e63946] text-white font-black uppercase tracking-wide text-sm rounded-xl hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {deleting ? "Eliminando..." : "Sí, eliminar"}
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  disabled={deleting}
                  className="flex-1 py-3 border-2 border-secondary/30 text-secondary font-bold uppercase tracking-wide text-sm rounded-xl hover:bg-secondary/10 disabled:opacity-50 transition-all cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUserButton;
