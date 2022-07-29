const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

const {
  guardarCliente,
  obtenerCliente,
  actualizarCliente,
  eliminarCliente,
  obtenerTodosClientes,
} = require("../controllers/DatosClienteController");

router.post("/guardarCliente", guardarCliente);
router.get("/obtenerCliente", obtenerCliente);
router.get("/obtenerTodosClientes", obtenerTodosClientes);
router.put("/actualizarCliente", actualizarCliente);
router.delete("/eliminarCliente", eliminarCliente);

module.exports = router;
