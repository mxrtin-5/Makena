const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const MercadoPago = Router();

mercadopago.configure({
    access_token: "TEST-5063350026624776-111619-7aa890bd181375331a78757f4269c055-1208791366",
});

MercadoPago.post("/", async (req, res) => {
    const { items } = req.body;

    try {
        const preference = {
            items,
            back_urls: {
                success: "http://localhost:5173/",
                failure: "http://localhost:3001/fallo",
            },
            auto_return: "approved",
        };

        const respuesta = await mercadopago.preferences.create(preference);
        console.log(respuesta);
        res.status(200).json(respuesta.response.id);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
});

module.exports = MercadoPago;