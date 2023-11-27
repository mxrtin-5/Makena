const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const MercadoPago = Router();

mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
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
        if(respuesta.status === 201) return res.status(201).json(respuesta.response.id);
        console.log(respuesta);
        return res.status(400).json({
            msg: 'Ha ocurrido un error con el pago'
        });
    } catch (error) {
        console.error(error.message);
        throw res.status(500).json(error.message);
    }
});

module.exports = MercadoPago;