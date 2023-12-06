const express = require("express");
const cors = require("cors");

//*- Importacion De Rutas :
const MercadoPago = require('./controllers/payment.controller')

const server = express();

//*- Proxy - Midleware :
server.use(express.json());
server.use(cors());
server.use("api/createOrder", MercadoPago);

module.exports = server;