const { response } = require("express");
const mongoose = require("mongoose");

const DatosClienteModel = require("../models/DatosClienteModel");
const DatosEmpleadoModel = require("../models/DatosEmpleadoModel");
const PrestacionesServicioModel = require("../models/PrestacionServicioModel");

const { logsPeticiones } = require("../utils/logsBackend");

// Obtener todos los datos de un cliente
const getConteoTotal = async (req, res) => {
  const DatosClienteFind = await DatosClienteModel.find({});
  const DatosEmpleadoFind = await DatosEmpleadoModel.find({});
  const PrestacionesServicioFind = await PrestacionesServicioModel.find({});

  logsPeticiones(
    {
      ok: true,
      clientesTotales: DatosClienteFind.length,
      empleadosTotales: DatosEmpleadoFind.length,
      prestacionesTotales: PrestacionesServicioFind.length,
    },
    "getConteoTotal"
  );

  return res.status(200).json({
    ok: true,
    clientesTotales: DatosClienteFind.length,
    empleadosTotales: DatosEmpleadoFind.length,
    prestacionesTotales: PrestacionesServicioFind.length,
  });
};

const getConteoReportes = async (req, res) => {
  const evaluacionTotales = await PrestacionesServicioModel.find({
    status: "Evaluacion",
  });
  const cotizacionesTotales = await PrestacionesServicioModel.find({
    status: "Cotizacion",
  });
  const procesoTotales = await PrestacionesServicioModel.find({
    status: "En proceso",
  });
  const terminadoTotales = await PrestacionesServicioModel.find({
    status: "Terminado",
  });

  logsPeticiones(
    {
      ok: true,
      evaluacionesTotales: evaluacionTotales.length,
      cotizacionesTotales: cotizacionesTotales.length,
      procesoTotales: procesoTotales.length,
      terminadoTotales: terminadoTotales.length,
    },
    "getConteoReportes"
  );

  return res.status(200).json({
    ok: true,
    evaluacionesTotales: evaluacionTotales.length,
    cotizacionesTotales: cotizacionesTotales.length,
    procesoTotales: procesoTotales.length,
    terminadoTotales: terminadoTotales.length,
  });
};

module.exports = {
  getConteoTotal,
  getConteoReportes,
};
