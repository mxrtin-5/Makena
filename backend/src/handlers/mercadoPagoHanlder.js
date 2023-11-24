const { config } = require("dotenv");
config();



const mercadopago = require('mercadopago');
const { MercadoPagoConfig, Preference } = mercadopago;

const accesToken = "TEST-5063350026624776-111619-7aa890bd181375331a78757f4269c055-1208791366"

const createPreference2 = async (info) => {

    let newData = [];

    const client = new MercadoPagoConfig({ accessToken: accesToken });

    const preference = new Preference(client);

    try {
        const preferenceCreated = await preference.create(info);
        console.log(preferenceCreated);
        return preferenceCreated;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { createPreference2 }  