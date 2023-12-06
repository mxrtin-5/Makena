import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/cartContext';


const ButtonMP = () => {

    const [idPreference, setIdPreference] = useState(null)

    const { cart } = useContext(CartContext)

    const cartNoImg = cart.map((prod) => {
        const { img, ...newItem } = prod

        return {
            id: newItem.id,
            title: newItem.name,
            quantity: newItem.counter,
            unit_price: newItem.price
        }
    })

    console.log(cartNoImg);


    useEffect(() => {
        initMercadoPago("APP_USR-b6e3a1d4-4cad-437f-ad2a-4d8755258222", { locale: 'es-AR' });
    }, []);

    const setPreference = async () => {
        try {
            const result = await fetch('https://makenafundas.com/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cartNoImg }),
            });

            console.log(result.status);

            const orderData = await result.json();

            setIdPreference(orderData)
            console.log(orderData);

        } catch (error) {
            console.error('Error al obtener la preferencia:', error);
        }
    };

    return (
        <div>
            <button onClick={setPreference}>Generar boton de pago</button>
            {idPreference ? <Wallet initialization={{ preferenceId: idPreference }} /> : <></>}
            <pre>{JSON.stringify(idPreference)}</pre>
        </div>
    );
};

export default ButtonMP;