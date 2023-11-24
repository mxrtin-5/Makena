import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/cartContext';



const ButtonMP = () => {

    const [idPreference, setIdPreference] = useState()

    const { cart } = useContext(CartContext)

    // const cartNoImg = cart.map((prod) => {
    //     const { img, ...newItem } = prod

    //     return newItem
    // })

    const staticData = {
        items: [
            {
                id: 0,
                title: 'GALAXY-A01',
                quantity: 1,
                unit_price: 5000
            }
        ],
        // Resto de los campos...
    };


    useEffect(() => {
        initMercadoPago('TEST-c5d11e40-96c2-420b-b5ee-9d91ba05b6a8', { locale: 'es-AR' });
    }, []);

    const getPreference = async () => {
        const result = await fetch('http://localhost:3001/createOrder', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ items: staticData.items })
        })
        console.log(result);
        const id = await result.json()
        console.log(id);
        setIdPreference(id);
    };
    return (
        <div>
            <button onClick={getPreference}>Crear Preferencia</button>
            {idPreference ? <Wallet initialization={{ preferenceId: idPreference }} /> : <></>}
            <pre>{JSON.stringify(idPreference)}</pre>
            <button onClick={() => cartNoImg}>pene</button>
        </div>
    );
};

export default ButtonMP;

