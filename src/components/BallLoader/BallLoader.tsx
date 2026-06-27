interface BallLoaderProps {
  label?: string;
}

const BallLoader = ({ label = "CARGANDO..." }: BallLoaderProps) => (
  <div className="flex flex-col items-center gap-3 select-none py-4">
    <div className="flex flex-col items-center gap-1">
      <span className="text-4xl inline-block animate-ball-bounce">⚽</span>
      <div className="w-8 h-1.5 rounded-full bg-border-retro animate-ball-shadow" />
    </div>
    <p className="font-mono font-black text-xs uppercase tracking-[0.2em] text-secondary animate-pulse">
      {label}
    </p>
  </div>
);

export default BallLoader;
