// RegEx: solo letras, números, guiones medios y bajos
const ALLOWED_CHARS_REGEX = /^[A-Za-z0-9_-]+$/;

// RegEx: verifica si el primer carácter es una letra
const STARTS_WITH_LETTER_REGEX = /^[A-Za-z]/;

interface ValidationResult {
  isValid: boolean;
  message: string;
}

/* Valida que el nombre de usuario cumpla con el formato permitido */
export const validateUsername = (username: string): ValidationResult => {
  if (!username || username.trim() === "") {
    return { isValid: false, message: "El usuario no puede estar vacío" };
  }

  if (username.length < 4) {
    return {
      isValid: false,
      message: "El usuario debe tener al menos 4 caracteres",
    };
  }

  if (!STARTS_WITH_LETTER_REGEX.test(username)) {
    return { isValid: false, message: "El usuario debe empezar con una letra" };
  }

  if (!ALLOWED_CHARS_REGEX.test(username)) {
    return { isValid: false, message: "Caracteres inválidos en el usuario" };
  }

  return { isValid: true, message: "" };
};

/* Valida que la contraseña tenga el formato permitido y al menos 4 caracteres */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: "La contraseña no puede estar vacía" };
  }

  if (password.length < 4) {
    return {
      isValid: false,
      message: "La contraseña debe tener al menos 4 caracteres",
    };
  }

  if (!ALLOWED_CHARS_REGEX.test(password)) {
    return { isValid: false, message: "Caracteres inválidos en la contraseña" };
  }

  return { isValid: true, message: "" };
};
