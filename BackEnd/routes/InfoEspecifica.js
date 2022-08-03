const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

const {
  getConteoTotal,
  getConteoReportes,
} = require("../controllers/InfoEspecificaController");

router.get("/getDatosCliente", getConteoTotal);
router.get("/getConteoReportes", getConteoReportes);

module.exports = router;
