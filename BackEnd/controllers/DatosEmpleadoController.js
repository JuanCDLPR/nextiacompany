const { response } = require("express");
const DatosEmpleadoModel = require("../models/DatosEmpleadoModel");
const { logsPeticiones } = require("../utils/logsBackend");

const guardarInfo = async (req, res = response) => {
  const {
    nombre,
    apellidos,
    correo,
    telefono,
    puesto,
    rol,
    usuario,
    contrasenia,
  } = req.body;

  const query = { usuario: usuario };
  try {
    const datosEmpleadoFind = await DatosEmpleadoModel.findOne(query);
    if (datosEmpleadoFind) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "Ya existe informacion para ese usuario",
        },
        "guardarInfoDatosEmpleado"
      );
      res.status(200).json({
        ok: true,
        msg: "Ya existe informacion para ese usuario",
      });
      return;
    }
    const datosEmpleado = new DatosEmpleadoModel({
      nombre,
      apellidos,
      correo,
      telefono,
      puesto,
      rol,
      usuario,
      contrasenia,
    });
    await datosEmpleado.save();
    logsPeticiones(
      {
        status: 200,
        ok: true,
        datosEmpleado,
      },
      "guardarInfoDatosEmpleado"
    );
    res.status(201).json({
      ok: true,
      datosEmpleado,
    });
  } catch (e) {
    console.log(e);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "guardarInfoDatosEmpleado"
    );
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const obtenerInfo = async (req, res = response) => {
  const query = req.query;
  try {
    const datosEmpleado = await DatosEmpleadoModel.findOne(query);
    if (!datosEmpleado) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "No existe informacion para ese usuario",
        },
        "obtenerInfoDatosEmpleado"
      );
      return res.status(200).json({
        ok: true,
        msg: "No existe informacion para ese usuario",
      });
    }
    return res.status(200).json({
      ok: true,
      datosEmpleado,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "obtenerInfoDatosEmpleado"
    );
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const actualizarInfo = async (req, res = response) => {
  const {
    nombre,
    apellidos,
    correo,
    telefono,
    puesto,
    rol,
    usuario,
    contrasenia,
  } = req.body;
  const query = req.query;
  try {
    const datosEmpleadoFind = await DatosEmpleadoModel.findOne(query);
    if (!datosEmpleadoFind) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "No hay informacion para ese folio",
        },
        "actualizarInfoDatosEmpleado"
      );
      res.status(200).json({
        ok: true,
        msg: "No hay informacion para ese folio",
      });
      return;
    }

    const datosEmpleado = await DatosEmpleadoModel.updateOne(query, {
      nombre,
      apellidos,
      correo,
      telefono,
      puesto,
      rol,
      usuario,
      contrasenia,
    });
    logsPeticiones(
      {
        status: 200,
        ok: true,
        msg: "Actualizado correctamente",
        datosEmpleado,
      },
      "actualizarInfoDatosEmpleado"
    );
    res.status(200).json({
      ok: true,
      msg: "Actualizado correctamente",
      datosEmpleado,
    });
  } catch (e) {
    console.log(e);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "actualizarInfoDatosEmpleado"
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
    const datosEmpleado = await DatosEmpleadoModel.findOneAndDelete(query);
    if (!datosEmpleado) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "No hay informacion para ese folio",
        },
        "eliminarInfoDatosEmpleado"
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
        datosEmpleado,
      },
      "eliminarInfoDatosEmpleado"
    );
    return res.status(200).json({
      ok: true,
      msg: "Eliminado correctamente",
      datadelete: datosEmpleado,
    });
  } catch (e) {
    console.log(e);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "eliminarInfoDatosEmpleado"
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
    const prestacionServicio = await DatosEmpleadoModel.find(query);
    if (!prestacionServicio) {
      logsPeticiones(
        {
          status: 200,
          ok: true,
          msg: "No hay informacion para ese folio",
        },
        "obtenerTodaInfoDatosEmpleado"
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
        prestacionServicio,
      },
      "obtenerTodaInfoDatosEmpleado"
    );
    return res.status(200).json({
      ok: true,
      prestacionServicio,
    });
  } catch (error) {
    //console.clear();
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "obtenerTodaInfoDatosEmpleado"
    );
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  guardarEmpleado: guardarInfo,
  obtenerEmpleado: obtenerInfo,
  eliminarEmpleado: eliminarInfo,
  actualizarEmpleado: actualizarInfo,
  obtenerTodasEmpleados: obtenerTodaInfo,
};
