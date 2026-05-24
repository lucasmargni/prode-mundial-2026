interface AuthModeButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const AuthModeButton = ({ label, isActive, onClick }: AuthModeButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-1/2 pb-4 font-bold text-xl border-b-2 transition-colors cursor-pointer text-center ${
        isActive
          ? "border-primary text-primary"
          : "border-transparent text-secondary hover:text-white"
      }`}
    >
      {label}
    </button>
  );
};

export default AuthModeButton;
