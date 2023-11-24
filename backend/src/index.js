const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const paymentRoutes = require("./routes/payment.routes.js");
const mercadopago = require('mercadopago');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/createOrder", )
app.use(morgan("dev"));
app.use(paymentRoutes);

// Configuración de MercadoPago
try {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
  });
} catch (error) {
  console.error("Error configuring MercadoPago:", error);
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use(express.static(path.resolve("src/public")));
const PORT = 3001;
app.listen(PORT);
console.log("Server on port", PORT);