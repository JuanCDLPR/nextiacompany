const { response } = require("express");
const PrestacionesServicioModel = require("../models/PrestacionServicioModel");

const guardarInfo = async (req, res = response) => {
  const { /* _id, */ folio, head, body, footer } = req.body;
  const query = { folio: folio };
  ///console.log("query", query);
  try {
    const prestacionServicioFind = await PrestacionesServicioModel.findOne(
      query
    );
    if (prestacionServicioFind) {
      res.status(200).json({
        ok: true,
        msg: "Ya existe informacion para ese folio",
      });
      return;
    }
    const prestacionServicio = new PrestacionesServicioModel({
      /* _id, */
      folio,
      head,
      body,
      footer,
    });
    await prestacionServicio.save();
    res.status(201).json({
      ok: true,
      prestacionServicio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const obtenerInfo = async (req, res = response) => {
  //const { folio } = req.params;
  //const fol = req.param("folio");
  //const query = { folio: folio };
  const query = req.query;

  try {
    const prestacionServicio = await PrestacionesServicioModel.findOne(query);
    if (!prestacionServicio) {
      res.status(200).json({
        ok: true,
        msg: "No hay informacion para ese folio",
      });
      return;
    }
    res.status(200).json({
      ok: true,
      prestacionServicio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const eliminarInfo = async (req, res = response) => {
  const query = req.query;

  try {
    const prestacionServicio = await PrestacionesServicioModel.findOneAndDelete(
      query
    );
    if (!prestacionServicio) {
      res.status(200).json({
        ok: true,
        msg: "No hay informacion para ese folio",
      });
      return;
    }
    res.status(200).json({
      ok: true,
      msg: "Eliminado correctamente",
      dataDelete: prestacionServicio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const actualizarInfo = async (req, res = response) => {
  const query = req.query;
  const { folio, head, body, footer } = req.body;

  console.log("query", query);
  console.log("body", req.body);

  try {
    const prestacionServicioFind = await PrestacionesServicioModel.findOne(
      query
    );
    if (!prestacionServicioFind) {
      res.status(200).json({
        ok: true,
        msg: "No hay informacion para ese folio",
      });
      return;
    }
    const prestacionServicio = await PrestacionesServicioModel.updateOne(
      query,
      {
        folio,
        head,
        body,
        footer,
      }
    );
    res.status(200).json({
      ok: true,
      msg: "Actualizado correctamente",
      prestacionServicio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const obtenerTodaInfo = async (req, res = response) => {
  const query = {};

  try {
    const prestacionServicio = await PrestacionesServicioModel.find(query);
    if (!prestacionServicio) {
      res.status(200).json({
        ok: true,
        msg: "No hay informacion en la base de datos",
      });
      return;
    }
    res.status(200).json({
      ok: true,
      prestacionServicio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  guardarInfo,
  obtenerInfo,
  eliminarInfo,
  actualizarInfo,
  obtenerTodaInfo,
};
