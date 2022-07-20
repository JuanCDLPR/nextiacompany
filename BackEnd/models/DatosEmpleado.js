const { Schema, model } = require("mongoose");

const DatosEmpleado = Schema({
  nombre: {
    type: String,
    required: false,
  },
  apellidos: {
    type: String,
    required: false,
  },
  correo: {
    type: String,
    required: false,
  },
  telefono: {
    type: String,
    required: false,
  },
  puesto: {
    type: String,
    required: false,
  },
  rol: {
    type: String,
    required: false,
  },
  usuario: {
    type: String,
    required: false,
  },
  contrasenia: {
    type: String,
    required: false,
  },
});

module.exports = model("DatosEmpleado", DatosEmpleado);
