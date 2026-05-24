/* src/components/LoginModal/AuthInputForm.tsx */
import { useState } from "react";

interface AuthInputFormProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "password";
  required?: boolean;
}

const AuthInputForm = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = true,
}: AuthInputFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

  const EyeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );

  const EyeSlashIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L9.878 9.878"
      />
    </svg>
  );

  return (
    <div>
      <label className="block text-sm font-medium text-secondary mb-1.5">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type={isPasswordType && showPassword ? "text" : type}
          required={required}
          value={value}
          onChange={onChange}
          className={`w-full px-5 py-3 bg-gray-700/50 border border-border rounded-xl text-white text-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
            isPasswordType ? "pr-16" : ""
          }`}
          placeholder={placeholder}
        />

        {isPasswordType && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={-1}
            className="absolute right-3 p-1.5 bg-gray-700 hover:bg-gray-600 border border-border rounded-lg cursor-pointer transition-colors flex items-center justify-center text-secondary hover:text-white focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInputForm;
