const { response } = require("express");
const InfoPrueba = require("../models/InfoPrueba");

const guardarInfo = async (req, res = response) => {
  const { name, description, date } = req.body;

  try {
    const info = new InfoPrueba({
      name,
      description,
      date,
    });

    await info.save();

    res.status(201).json({
      ok: true,
      info,
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
  const date = req.header("date");
  try {
    ///console.log("date: ", date);
    const info = await InfoPrueba.find({ date });

    ///console.log("INFO:", info.length);

    if (info.length === 0) {
      res.status(200).json({
        ok: true,
        msg: "No hay informacion para esa fecha",
      });
    }

    res.status(200).json({
      ok: true,
      info,
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
  const id = req.params.id;
  const { name, description, date } = req.body;

  try {
    const info = await InfoPrueba.findByIdAndUpdate(
      id,
      {
        name,
        description,
        date,
      },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      info,
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
  const id = req.params.id;

  try {
    const info = await InfoPrueba.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      info,
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
  actualizarInfo,
  eliminarInfo,
};
