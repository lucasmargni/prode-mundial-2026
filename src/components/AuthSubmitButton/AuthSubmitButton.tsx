interface AuthSubmitButtonProps {
  label: string;
  loadingLabel?: string;
  isLoading: boolean;
}

const AuthSubmitButton = ({
  label,
  loadingLabel = "Procesando...",
  isLoading,
}: AuthSubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-4 bg-primary hover:bg-primary/90 disabled:bg-gray-700 transition-colors rounded-xl font-bold text-white text-lg mt-4 cursor-pointer active:scale-[0.98]"
    >
      {isLoading ? loadingLabel : label}
    </button>
  );
};

export default AuthSubmitButton;
