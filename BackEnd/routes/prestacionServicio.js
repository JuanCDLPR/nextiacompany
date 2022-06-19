const { Router } = require("express");

const {
  guardarInfo,
  obtenerInfo,
  eliminarInfo,
  actualizarInfo,
} = require("../controllers/PrestacionServicioController");

const router = Router();

router.post("/postPrestacionServicio", guardarInfo);
router.get("/getPrestacionServicio", obtenerInfo);
router.delete("/deletePrestacionServicio", eliminarInfo);
router.put("/updatePrestacionServicio", actualizarInfo);

module.exports = router;
