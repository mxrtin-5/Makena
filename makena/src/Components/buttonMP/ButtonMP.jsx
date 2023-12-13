import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/cartContext';
import styles from './ButtonMP.module.css'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


const ButtonMP = () => {

    const [idPreference, setIdPreference] = useState(null)

    const { cart, precioTotal } = useContext(CartContext)

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
        initMercadoPago("APP_USR-c7a1b5c7-24e6-4476-8fd1-d9883775f1d7", { locale: 'es-AR' });
    }, []);

    const setPreference = async () => {
        try {
            const result = await fetch('https://makenafundas.com/api/createOrder', {
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
            Toastify({
                text: `Ocurrio un error ${error}`,
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        }
    };

    return (
        <div className={styles.container}>
            <button className={styles.btn} onClick={setPreference}>Finalizar Compra</button>
            {idPreference ? <Wallet initialization={{ preferenceId: idPreference }} /> : <></>}
        </div>
    );
};

export default ButtonMP;