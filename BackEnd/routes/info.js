const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  guardarInfo,
  obtenerInfo,
  clearConsole,
} = require("../controllers/saveInfo");

const router = Router();

//publicar informacion
router.post(
  "/postInfo",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripcion es obligatoria").not().isEmpty(),
    check("date", "La fecha es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  guardarInfo
);

//obntener informacion
router.get("/getInfo", obtenerInfo);

//limpiar consola
router.get("/getClear", clearConsole);

module.exports = router;
