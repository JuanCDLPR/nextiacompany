const { Schema, model } = require("mongoose");

const DatosClienteSchema = Schema({
  empresa: {
    type: String,
    required: false,
  },
  direccion: {
    type: String,
    required: false,
  },
  cp: {
    type: String,
    required: false,
  },
  telefono: {
    type: String,
    required: false,
  },
  rfc: {
    type: String,
    required: false,
  },
  contacto: {
    nombre: {
      type: String,
      required: false,
    },
    apellidos: {
      type: String,
      required: false,
    },
    telefono: {
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
    cargo: {
      type: String,
      required: false,
    },
    area: {
      type: String,
      required: false,
    },
  },
});

module.exports = model("DatosCliente", DatosClienteSchema);
