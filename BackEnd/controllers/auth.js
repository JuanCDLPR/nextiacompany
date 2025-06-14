const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const { logsPeticiones } = require("../utils/logsBackend");

const crearUsuario = async (req, res = response) => {
  const { email, name, password } = req.body;

  try {
    // Verificar el email
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      logsPeticiones(
        {
          status: 400,
          ok: false,
          msg: "El usuario ya existe con ese email",
        },
        "crearUsuario"
      );
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese email",
      });
    }

    // Crear usuario con el modelo
    const dbUser = new Usuario(req.body);

    // Hashear la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    // Generar el JWT
    const token = await generarJWT(dbUser.id, name);

    // Crear usuario de DB
    await dbUser.save();

    // Generar respuesta exitosa
    logsPeticiones(
      {
        status: 200,
        ok: true,
        uid: dbUser.id,
        name,
        token,
      },
      "crearUsuario"
    );
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Por favor hable con el administrador",
      },
      "crearUsuario"
    );
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    ///console.clear();
    //console.log("email:", email);
    //console.log("passwor:", password);
    const dbUser = await Usuario.findOne({ email });

    if (!dbUser) {
      logsPeticiones(
        {
          status: 200,
          ok: false,
          msg: "El correo no existe",
          datos: { email, password },
        },
        "loginUsuario"
      );
      return res.status(200).json({
        ok: false,
        msg: "El correo no existe",
      });
    }

    // Confirmar si el password hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if (!validPassword) {
      logsPeticiones(
        {
          status: 200,
          ok: false,
          msg: "El password no es válido",
          datos: { email, password },
        },
        "loginUsuario"
      );
      return res.status(200).json({
        ok: false,
        msg: "El password no es válido",
      });
    }

    // Generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.name);

    // Respuesta del servicio
    logsPeticiones(
      {
        status: 200,
        ok: true,
        msg: "Usuario encontrado",
        uid: dbUser.id,
        name: dbUser.name,
        userType: dbUser.userType,
        token,
      },
      "loginUsuario"
    );
    return res.status(200).json({
      ok: true,
      msg: "Usuario encontrado",
      uid: dbUser.id,
      name: dbUser.name,
      userType: dbUser.userType,
      token,
    });
  } catch (error) {
    console.log(error);
    logsPeticiones(
      {
        status: 500,
        ok: false,
        msg: "Hable con el administrador",
      },
      "loginUsuario"
    );
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req;

  // Generar el JWT
  const token = await generarJWT(uid, name);

  return res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
