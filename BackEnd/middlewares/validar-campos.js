const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
  const errors = validationResult(req);
  //console.log("errorsss:", errors.errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      msg: "revisa los campos e ingresa datos validos",
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  validarCampos,
};
