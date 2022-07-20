const { Schema, model } = require("mongoose");

const DatosClienteSchema = Schema({
  nombre: {
    type: String,
    required: false,
  },
  apellidos: {
    type: String,
    required: false,
  },
  empresa: {
    type: String,
    required: false,
  },
  telefonoFijo: {
    type: String,
    required: false,
  },
  telefonoEmpresa: {
    type: String,
    required: false,
  },
  telefonoCelular: {
    type: String,
    required: false,
  },
  direccion: {
    type: String,
    required: false,
  },
  correo: {
    type: String,
    required: false,
  },
  fax: {
    type: String,
    required: false,
  },
  fechaNacimiento: {
    type: String,
    required: false,
  },
  correoSecundario: {
    type: String,
    required: false,
  },
  cargo: {
    type: String,
    required: false,
  },
  departamento: {
    type: String,
    required: false,
  },
  secretaria: {
    nombre: {
      type: String,
      required: false,
    },
    telefono: {
      type: String,
      required: false,
    },
  },
  /* */
});
