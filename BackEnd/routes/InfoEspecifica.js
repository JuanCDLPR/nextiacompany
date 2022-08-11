const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

const {
  getConteoTotal,
  getConteoReportes,
  informacionEspecificaDatosCliente,
  informacionEspecificaDatosEmpleado,
  informacionEspecificaPrestacionesServicio,
} = require("../controllers/InfoEspecificaController");

router.get("/getDatosCliente", getConteoTotal);
router.get("/getConteoReportes", getConteoReportes);
router.get(
  "/informacionEspecificaDatosCliente",
  informacionEspecificaDatosCliente
);
router.get(
  "/informacionEspecificaDatosEmpleado",
  informacionEspecificaDatosEmpleado
);
router.get(
  "/informacionEspecificaPrestacionesServicio",
  informacionEspecificaPrestacionesServicio
);

module.exports = router;
