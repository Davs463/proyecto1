// Prueba simple con validaciones

const usuario = {
  nombre: "Ana",
  email: "ana@correo.com",
  edad: 28,
  password: "12345"
};

function validarRequerido(valor, campo) {
  if (valor === undefined || valor === null || String(valor).trim() === "") {
    return `${campo} es obligatorio.`;
  }
  return null;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return "El email no es válido.";
  }
  return null;
}

function validarNumero(valor, campo) {
  if (isNaN(valor)) {
    return `${campo} debe ser un número.`;
  }
  return null;
}

function validarLongitudMinima(valor, minimo, campo) {
  if (String(valor).length < minimo) {
    return `${campo} debe tener al menos ${minimo} caracteres.`;
  }
  return null;
}

function validarUsuario(usuario) {
  const errores = {};

  const nombreError = validarRequerido(usuario.nombre, "Nombre");
  if (nombreError) errores.nombre = nombreError;

  const emailError = validarRequerido(usuario.email, "Email") || validarEmail(usuario.email);
  if (emailError) errores.email = emailError;

  const edadError = validarRequerido(usuario.edad, "Edad") || validarNumero(usuario.edad, "Edad");
  if (edadError) errores.edad = edadError;

  const passwordError = validarRequerido(usuario.password, "Contraseña") || validarLongitudMinima(usuario.password, 6, "Contraseña");
  if (passwordError) errores.password = passwordError;

  return errores;
}

const errores = validarUsuario(usuario);

if (Object.keys(errores).length === 0) {
  console.log("Formulario válido.");
} else {
  console.log("Hay errores:", errores);
}
