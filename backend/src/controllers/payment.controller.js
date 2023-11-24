const { createPreference2 } = require('../handlers/mercadoPagoHanlder.js');
const { Router } = require("express");

const MP = Router()

const createOrder = async (req, res) => {
    console.log(req.body);

    // Construir la lista de items a partir del carrito
    MP.post("/", async (req, res) => {
        const producto = req.body;
        console.log(producto);

        try {
            const preference = {
                items: [
                    {
                        title: producto.name,
                        unit_price: producto.price,
                        currency_id: "ARS",
                        quantity: producto.counter,
                    },
                ],

                back_urls: {
                    success: "http://localhost:5173/",
                    failure: "http://localhost:3000/fallo",
                },

                auto_return: "approved",
            };

            const respuesta = await mercadopago.preferences.create(preference);
            console.log(respuesta);
            res.status(200).json(respuesta.response.init_point);
        } catch (error) {
            console.error(error.message);
            res.status(500).json(error.message);
        }
    });

};

module.exports = createOrder
