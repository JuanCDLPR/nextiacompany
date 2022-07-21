const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();
const {
  guardarEmpleado,
  obtenerEmpleado,
  eliminarEmpleado,
  actualizarEmpleado,
  obtenerTodasEmpleados,
} = require("../controllers/DatosEmpleadoController");

router.post(
  "/guardarEmpleado",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El email es obligatorio").isEmail(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("puesto", "El puesto es obligatorio").not().isEmpty(),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    check("usuario", "El usuario es obligatorio").not().isEmpty(),
    check("contrasenia", "La contraseña es obligatoria").isLength({ min: 6 }),
    validarCampos,
  ],
  guardarEmpleado
);
router.get("/obtenerEmpleado", obtenerEmpleado);
router.delete("/eliminarEmpleado", eliminarEmpleado);
router.put("/actualizarEmpleado", actualizarEmpleado);
router.get("/obtenerTodasEmpleados", obtenerTodasEmpleados);

module.exports = router;
