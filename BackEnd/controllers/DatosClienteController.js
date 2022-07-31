const { response } = require("express");
const mongoose = require("mongoose");
const DatosClienteModel = require("../models/DatosClienteModel");
const { logsPeticiones } = require("../utils/logsBackend");

const guardarInfo = async (req, res = response) => {
  const { empresa, direccion, cp, telefono, rfc, contacto } = req.body;

  const query = { empresa: empresa };
  try {
    const DatosClienteFind = await DatosClienteModel.findOne(query);
    if (DatosClienteFind) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "Ya existe informacion para ese cliente",
        },
        "guardarInfoDatosCliente"
      );
      return res.status(200).json({
        ok: true,
        msg: "Ya existe informacion para ese cliente",
      });
    }
    const DatosCliente = new DatosClienteModel({
      empresa,
      direccion,
      cp,
      telefono,
      rfc,
      contacto,
    });
    await DatosCliente.save();
    logsPeticiones(
      {
        status: 200,
        ok: true,
        DatosCliente,
      },
      "guardarInfoDatosCliente"
    );
    return res.status(200).json({
      ok: true,
      DatosCliente,
    });
  } catch (e) {
    console.log(e);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Error al guardar la informacion",
      },
      "guardarInfoDatosCliente"
    );
    return res.status(500).json({
      ok: false,
      msg: "Error al guardar la informacion",
    });
  }
};

const obtenerInfo = async (req, res = response) => {
  const query = req.query;
  try {
    const DatosClienteFind = await DatosClienteModel.findOne(query);
    if (!DatosClienteFind) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "No existe informacion para ese cliente",
        },
        "obtenerInfoDatosCliente"
      );
      return res.status(200).json({
        ok: true,
        msg: "No existe informacion para ese cliente",
      });
    }
    logsPeticiones(
      {
        status: 200,
        ok: true,
        DatosClienteFind,
      },
      "obtenerInfoDatosCliente"
    );
    return res.status(200).json({
      ok: true,
      DatosClienteFind,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Error al obtener la informacion",
      },
      "obtenerInfoDatosCliente"
    );
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener la informacion",
    });
  }
};

const actualizarInfo = async (req, res = response) => {
  const { empresa, direccion, cp, telefono, rfc, contacto } = req.body;
  ///console.log(req.query.id);
  ///const query = req.query;
  const query = { _id: mongoose.Types.ObjectId(req.query.id) };
  try {
    const DatosClienteFind = await DatosClienteModel.findOne(query);
    if (!DatosClienteFind) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "No existe informacion para ese cliente",
        },
        "actualizarInfoDatosCliente"
      );
      return res.status(200).json({
        ok: true,
        msg: "No existe informacion para ese cliente",
      });
    }
    const DatosCliente = await DatosClienteModel.findByIdAndUpdate(
      DatosClienteFind._id,
      {
        empresa,
        direccion,
        cp,
        telefono,
        rfc,
        contacto,
      },
      { new: true }
    );
    logsPeticiones(
      {
        status: 200,
        ok: true,
        DatosCliente,
      },
      "actualizarInfoDatosCliente"
    );
    return res.status(200).json({
      ok: true,
      DatosCliente,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Error al actualizar la informacion",
      },
      "actualizarInfoDatosCliente"
    );
    return res.status(500).json({
      ok: false,
      msg: "Error al actualizar la informacion",
    });
  }
};

const eliminarInfo = async (req, res = response) => {
  const query = req.query;
  try {
    const DatosClienteFind = await DatosClienteModel.findOne(query);
    if (!DatosClienteFind) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "No existe informacion para ese cliente",
        },
        "eliminarInfoDatosCliente"
      );
      return res.status(200).json({
        ok: true,
        msg: "No existe informacion para ese cliente",
      });
    }
    await DatosClienteModel.findByIdAndDelete(DatosClienteFind._id);
    logsPeticiones(
      {
        status: 200,
        ok: true,
        msg: "Informacion eliminada correctamente",
      },
      "eliminarInfoDatosCliente"
    );
    return res.status(200).json({
      ok: true,
      msg: "Informacion eliminada correctamente",
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Error al eliminar la informacion",
      },
      "eliminarInfoDatosCliente"
    );
    return res.status(500).json({
      ok: false,
      msg: "Error al eliminar la informacion",
    });
  }
};

const obtenerTodaInfo = async (req, res = response) => {
  try {
    const DatosClienteFind = await DatosClienteModel.find();
    logsPeticiones(
      {
        status: 200,
        ok: true,
        DatosClienteFind,
      },
      "obtenerTodaInfoDatosCliente"
    );
    return res.status(200).json({
      ok: true,
      DatosClienteFind,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Error al obtener la informacion",
      },
      "obtenerTodaInfoDatosCliente"
    );
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener la informacion",
    });
  }
};

module.exports = {
  guardarCliente: guardarInfo,
  obtenerCliente: obtenerInfo,
  actualizarCliente: actualizarInfo,
  eliminarCliente: eliminarInfo,
  obtenerTodosClientes: obtenerTodaInfo,
};
