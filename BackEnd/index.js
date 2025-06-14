const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
require("dotenv").config();

// Crear el servidor/aplicación de express
const app = express();

// Base de datos
dbConnection();

// Directorio Público
app.use(express.static("public"));

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/info", require("./routes/info"));
app.use("/api/prestacionServicio", require("./routes/prestacionServicio"));
app.use("/api/datosEmpleado", require("./routes/datosEmpleado"));
app.use("/api/datosCliente", require("./routes/datosCliente"));
app.use("/api/InfoEspecifica", require("./routes/InfoEspecifica"));

app.listen(process.env.PORT, () => {
  ///console.clear();
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
