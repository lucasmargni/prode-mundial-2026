import { useState } from "react";
import AuthModeButton from "../AuthModeButton/AuthModeButton";
import AuthForm from "../AuthForm/AuthForm";

const LoginModal = () => {
  const [isLoginTab, setIsLoginTab] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-surface border border-border rounded-2xl p-10 shadow-2xl text-white">
        <div className="flex border-b border-border mb-8">
          <AuthModeButton
            label="Iniciar Sesión"
            isActive={isLoginTab}
            onClick={() => setIsLoginTab(true)}
          />
          <AuthModeButton
            label="Crear Cuenta"
            isActive={!isLoginTab}
            onClick={() => setIsLoginTab(false)}
          />
        </div>

        <AuthForm isLoginTab={isLoginTab} />
      </div>
    </div>
  );
};

export default LoginModal;
