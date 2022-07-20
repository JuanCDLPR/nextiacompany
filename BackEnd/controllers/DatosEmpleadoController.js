const { response } = require("express");
const DatosEmpleadoModel = require("../models/DatosEmpleadoModel");

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
    res.status(201).json({
      ok: true,
      datosEmpleado,
    });
  } catch (e) {
    console.log(error);
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
      res.status(200).json({
        ok: true,
        msg: "No hay informacion para ese usuario",
      });
      return;
    }
    res.status(200).json({
      ok: true,
      datosEmpleado,
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
    const datosEmpleadoFind = await PrestacionesServicioModel.findOne(query);
    if (!datosEmpleadoFind) {
      res.status(200).json({
        ok: true,
        msg: "No hay informacion para ese folio",
      });
      return;
    }

    const datosEmpleado = await PrestacionesServicioModel.updateOne(query, {
      nombre,
      apellidos,
      correo,
      telefono,
      puesto,
      rol,
      usuario,
      contrasenia,
    });
    res.status(200).json({
      ok: true,
      msg: "Actualizado correctamente",
      datosEmpleado,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
const eliminarInfo = async (req, res = response) => {
  const query = req.query;
  try {
    const datosEmpleado = await PrestacionesServicioModel.findOneAndDelete(
      query
    );
    if (!datosEmpleado) {
      res.status(200).json({
        ok: true,
        msg: "No hay informacion para ese folio",
      });
      return;
    }
    res.status(200).json({
      ok: true,
      msg: "Eliminado correctamente",
      datadelete: datosEmpleado,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
module.exports = {
  guardarInfo,
  obtenerInfo,
  actualizarInfo,
  eliminarInfo,
};
