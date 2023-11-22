import { createPreference2 } from '../handlers/mercadoPagoHanlder.js';


export const createOrder = async (req, res) => {
    console.log(req.body);

    // Construir la lista de items a partir del carrito
    const items = req.body.items.map((item, index) => {
        const { name, price, counter } = item;
        return {
            id: index,
            title: name,
            quantity: counter,
            unit_price: price
        };
    });

    let preference = {
        items,
        back_urls: {
            success: "http://localhost:5173",
            failure: "https://google.com",
            pending: "",
        },
        auto_return: "approved",
        shipments: {
            cost: 0,
            mode: "not_specified",
        },
        payer: {
            name: 'João',
            surname: 'Silva',
            email: 'user@email.com',
            phone: {
                area_code: '11',
                number: '4444-4444'
            },
        identification: {
                type: 'CPF',
                number: '19119119100'
            },
        address: {
                street_name: 'Street',
                street_number: 123,
                zip_code: '06233200'
            },
        payment_methods: {
            excluded_payment_methods: [],
            excluded_payment_types: [],
            installments: 1
        },
        notification_url: 'https://www.your-site.com/ipn',
        statement_descriptor: 'MEUNEGOCIO',
        external_reference: 'Reference_1234',
        expires: true,
        expiration_date_from: '2016-02-01T12:00:00.000-04:00',
        expiration_date_to: '2016-02-28T12:00:00.000-04:00'
    }
};

console.log(preference);

try {
    const preferenceCreated = await createPreference2(preference);
    console.log(preferenceCreated);
    return res.status(200).send({
        response: preferenceCreated
    });
} catch (error) {
    console.error(error);
    return res.status(500).send({
        error: error.message
    });
}
};
