import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/cartContext';


const ButtonMP = ({ handlePago }) => {

    const [idPreference, setIdPreference] = useState(null)

    const { cart } = useContext(CartContext)

    const [pagoAprobado, setPagoAprobado] = useState(false);

    const cartNoImg = cart.map((prod) => {
        const { img, ...newItem } = prod

        return {
            id: newItem.id,
            title: newItem.name,
            quantity: newItem.counter,
            unit_price: newItem.price
        }
    })

    useEffect(() => {
        initMercadoPago("APP_USR-c7a1b5c7-24e6-4476-8fd1-d9883775f1d7", { locale: 'es-AR' });
    }, []);

    const handlePagoAprobado = () => {
        setPagoAprobado(true);
    };

    const handleOnReady = () => {
        if (window.Mercadopago) {
            window.Mercadopago.preference.on('approved', handlePagoAprobado);
        }
    };

    useEffect(() => {
        handleOnReady();
    }, []);

    useEffect(() => {
        if (pagoAprobado) {
            handlePago();
        }
    }, [pagoAprobado]);

    const getPreference = async () => {
        try {
            const result = await fetch('http://62.72.63.229:3001/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cartNoImg }),
            });

            console.log(result.status);

            const orderData = await result.json();
            console.log(orderData);

            setIdPreference(orderData)

        } catch (error) {
            console.error('Error al obtener la preferencia:', error);
        }
    };

    return (
        <div>
            <button onClick={getPreference}>Generar boton de pago</button>
            {idPreference ? <Wallet initialization={{ preferenceId: idPreference }} /> : <></>}
            <pre>{JSON.stringify(idPreference)}</pre>
        </div>
    );
};

export default ButtonMP;

