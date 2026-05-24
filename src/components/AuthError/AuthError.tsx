/* src/components/LoginModal/AuthErrorMessage.tsx */
interface AuthErrorProps {
  message: string;
}

const AuthErrorMessage = ({ message }: AuthErrorProps) => {
  if (!message) return null;

  return (
    <div className="p-4 bg-red-900/40 border border-red-500 rounded-xl text-red-200 text-base font-medium">
      {message}
    </div>
  );
};

export default AuthErrorMessage;
