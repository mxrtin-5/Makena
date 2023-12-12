const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const MercadoPago = Router();

mercadopago.configure({
    access_token: process.env.ACCESS,
});

MercadoPago.post("/", async (req, res) => {
    const { items } = req.body;

    try {
        const preference = {
            items,
            back_urls: {
                success: "https://makenafundas.com/order/completed",
                failure: "https://youtube.com/",
            },
            auto_return: "approved",
        };

        const respuesta = await mercadopago.preferences.create(preference);
        res.status(200).json(respuesta.response.id);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
});

module.exports = MercadoPago;