const { Schema, model } = require("mongoose");

const PrestacionServicioSchema = Schema({
  /*  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  }, */
  folio: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  tenicoAsignado: {
    type: String,
    required: false,
  },
  tipoDeServicio: {
    type: String,
    required: false,
  },
  head: {
    horaSalida: {
      type: String,
      required: false,
    },
    horaInicio: {
      type: String,
      required: false,
    },
    horaFin: {
      type: String,
      required: false,
    },
    horaLlegada: {
      type: String,
      required: false,
    },
    vehiculo: {
      type: String,
      required: false,
    },
    kilometraje: {
      inicio: {
        type: Number,
        required: false,
      },
      fin: {
        type: Number,
        required: false,
      },
    },
    fecha: {
      type: String,
      required: false,
    },
    cliente: {
      type: String,
      required: false,
    },
    solicitante: {
      type: String,
      required: false,
    },
    ubicacion: {
      type: String,
      required: false,
    },
  },
  body: {
    maquina_equipo: {
      type: String,
      required: false,
    },
    requerimientos: {
      type: String,
      required: false,
    },
    diagnostico: {
      type: String,
      required: false,
    },
    solucion: {
      type: String,
      required: false,
    },
    refacciones: {
      type: String,
      required: false,
    },
  },
  footer: {
    vigilancia: {
      type: String,
      required: false,
    },
    solicitante: {
      type: String,
      required: false,
    },
    ingServicio1: {
      type: String,
      required: false,
    },
    ingServicio2: {
      type: String,
      required: false,
    },
    ingServicio3: {
      type: String,
      required: false,
    },
  },
});

module.exports = model("PrestacionServicio", PrestacionServicioSchema);
