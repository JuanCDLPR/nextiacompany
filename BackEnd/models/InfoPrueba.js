const { Schema, model } = require("mongoose");

const InfoPruebaSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
});

module.exports = model("InfoPrueba", InfoPruebaSchema);
