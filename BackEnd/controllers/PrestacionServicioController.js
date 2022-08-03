const { response } = require("express");
const PrestacionesServicioModel = require("../models/PrestacionServicioModel");
const { logsPeticiones } = require("../utils/logsBackend");

const guardarInfo = async (req, res = response) => {
  const {
    /* _id, */ folio,
    status,
    tenicoAsignado,
    tipoDeServicio,
    head,
    body,
    footer,
  } = req.body;
  const query = { folio: folio };
  ///console.log("query", query);
  try {
    const prestacionServicioFind = await PrestacionesServicioModel.findOne(
      query
    );
    if (prestacionServicioFind) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "Ya existe informacion para ese folio",
        },
        "guardarInfoPrestacionServicio"
      );

      return res.status(200).json({
        ok: true,
        msg: "Ya existe informacion para ese folio",
      });
    }
    const prestacionServicio = new PrestacionesServicioModel({
      /* _id, */
      folio,
      status,
      tenicoAsignado,
      tipoDeServicio,
      head,
      body,
      footer,
    });
    await prestacionServicio.save();
    logsPeticiones(
      {
        status: 201,
        ok: true,
        prestacionServicio,
      },
      "guardarInfoPrestacionServicio"
    );
    return res.status(201).json({
      ok: true,
      prestacionServicio,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "guardarInfoPrestacionServicio"
    );
    return res.status(500).json({
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
      logsPeticiones(
        {
          status: 200,
          ok: true,
          dataStatus: false,
          msg: "No existe informacion para ese folio",
        },
        "obtenerInfoPrestacionServicio"
      );
      return res.status(200).json({
        ok: true,
        dataStatus: false,
        msg: "No hay informacion para ese folio",
      });
    }
    logsPeticiones(
      {
        status: 200,
        ok: true,
        dataStatus: true,
        prestacionServicio,
      },
      "obtenerInfoPrestacionServicio"
    );
    return res.status(200).json({
      ok: true,
      dataStatus: true,
      prestacionServicio,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "obtenerInfoPrestacionServicio"
    );
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
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "No existe informacion para ese folio",
        },
        "eliminarInfoPrestacionServicio"
      );
      return res.status(200).json({
        ok: true,
        msg: "No hay informacion para ese folio",
      });
    }
    logsPeticiones(
      {
        status: 200,
        ok: true,
        msg: "Eliminado correctamente",
        dataDelete: prestacionServicio,
      },
      "eliminarInfoPrestacionServicio"
    );
    return res.status(200).json({
      ok: true,
      msg: "Eliminado correctamente",
      dataDelete: prestacionServicio,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "eliminarInfoPrestacionServicio"
    );

    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const actualizarInfo = async (req, res = response) => {
  const query = req.query;
  const { folio, status, tenicoAsignado, tipoDeServicio, head, body, footer } =
    req.body;

  console.log("query", query);
  console.log("body", req.body);

  try {
    const prestacionServicioFind = await PrestacionesServicioModel.findOne(
      query
    );
    if (!prestacionServicioFind) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "No existe informacion para ese folio",
        },
        "actualizarInfoPrestacionServicio"
      );
      return res.status(200).json({
        ok: true,
        msg: "No hay informacion para ese folio",
      });
    }
    const prestacionServicio = await PrestacionesServicioModel.updateOne(
      query,
      {
        folio,
        status,
        tenicoAsignado,
        tipoDeServicio,
        head,
        body,
        footer,
      }
    );
    logsPeticiones(
      {
        status: 200,
        ok: true,
        msg: "Actualizado correctamente",
        dataUpdate: prestacionServicio,
      },
      "actualizarInfoPrestacionServicio"
    );
    return res.status(200).json({
      ok: true,
      msg: "Actualizado correctamente",
      dataUpdate: prestacionServicio,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "actualizarInfoPrestacionServicio"
    );
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
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "No hay informacion en la base de datos",
        },
        "obtenerTodaInfoPrestacionServicio"
      );
      return res.status(200).json({
        ok: true,
        msg: "No hay informacion en la base de datos",
      });
    }
    logsPeticiones(
      {
        status: 200,
        ok: true,
        msg: "Informacion obtenida correctamente",
        data: prestacionServicio,
      },
      "obtenerTodaInfoPrestacionServicio"
    );
    return res.status(200).json({
      ok: true,
      prestacionServicio,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "obtenerTodaInfoPrestacionServicio"
    );
    return res.status(500).json({
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
