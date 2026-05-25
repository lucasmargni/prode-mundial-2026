import React from "react";

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper = ({ title, onClose, children }: Props) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenido del Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-bg-card shadow-2xl border border-secondary/20 transition-colors duration-300">
        <div className="flex items-center justify-between border-b p-4 border-secondary/10">
          <h3 className="text-lg font-bold text-border-retro">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary/10 rounded-full cursor-pointer transition-colors"
          >
            ❌
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
