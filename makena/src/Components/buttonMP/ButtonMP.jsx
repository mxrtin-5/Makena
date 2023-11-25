import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/cartContext';



const ButtonMP = ({ handlePago }) => {

    const [idPreference, setIdPreference] = useState()

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

    // const staticData = {
    //     items: [
    //         {
    //             id: 0,
    //             title: 'GALAXY-A01',
    //             quantity: 1,
    //             unit_price: 5000
    //         }
    //     ],
    //     // Resto de los campos...
    // };

    console.log(cartNoImg);


    useEffect(() => {
        initMercadoPago('TEST-c5d11e40-96c2-420b-b5ee-9d91ba05b6a8', { locale: 'es-AR' });
    }, []);

    const getPreference = async () => {
        try {
            const result = await fetch('http://localhost:3001/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cartNoImg }),
            });

            console.log(result.status);

            const orderData = await result.json();
            console.log(orderData);

            // Verificar si el pago fue aprobado
            if (result.status === 200) {
                setIdPreference(orderData);
                handlePago();
            } else {
                console.error('El pago no fue aprobado.');
            }
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

