// Capturar elementos
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const edad = document.getElementById("edad");
const mensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("btnEnviar");
const tbodyRegistros = document.getElementById("tbodyRegistros");

// Función de validación básica de correo
function correoValido(email) {
  // Validación sencilla: debe contener "@" y "."
  return email.includes("@") && email.includes(".");
}

// Evento click
btnEnviar.addEventListener("click", function () {
  // Limpiar mensaje previo
  mensaje.innerHTML = "";

  const nombreVal = nombre.value.trim();
  const correoVal = correo.value.trim();
  const edadVal = edad.value.trim();

  // Validar campos vacíos
  if (nombreVal === "" || correoVal === "" || edadVal === "") {
    mensaje.innerHTML =
      `<div class="alert alert-danger">⚠ Todos los campos son obligatorios.</div>`;
    return;
  }

  // Validar formato básico de correo
  if (!correoValido(correoVal)) {
    mensaje.innerHTML =
      `<div class="alert alert-danger">⚠ Ingresa un correo válido (debe contener "@" y ".").</div>`;
    return;
  }

  // Validar edad
  if (Number(edadVal) < 18) {
    mensaje.innerHTML =
      `<div class="alert alert-warning">⚠ Debes ser mayor de 18 años.</div>`;
    return;
  }

  // Si todo está correcto: mensaje de éxito
  mensaje.innerHTML =
    `<div class="alert alert-success">✔ Registro exitoso. Bienvenido, <strong>${nombreVal}</strong>!</div>`;

  // Agregar registro a la tabla
  const nuevaFila = document.createElement("tr");
  nuevaFila.innerHTML = `
    <td>${nombreVal}</td>
    <td>${correoVal}</td>
    <td>${edadVal}</td>
  `;
  tbodyRegistros.appendChild(nuevaFila);

  // Limpiar inputs
  nombre.value = "";
  correo.value = "";
  edad.value = "";
  nombre.focus();
});
