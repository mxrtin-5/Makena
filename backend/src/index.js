import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(morgan("dev"));
app.use(paymentRoutes);


app.use(express.static(path.resolve("src/public")));
const PORT = 3001
app.listen(PORT);
console.log("Server on port", PORT);