import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import { DataContext } from "../../context/dataContext";
import { initMercadoPago } from '@mercadopago/sdk-react'




const CheckoutMP = () => {

    const { cart } = useContext(CartContext);

    const { orderData } = useContext(DataContext)

    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

    useEffect(() => {

        const fetchCheckout = async () => {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart,
                    orderData
                }),
            })
            const data = await res.json()

            
            if (data.global) {
                const script = document.createElement('script') 
                
                script.type = 'text/javascript'
                
                script.src = 'https://sdk.mercadopago.com/js/v2' 
                
                script.setAttribute('data-preference-id', data.global) 
                
                document.body.appendChild(script)

                const mp = new window.MercadoPago("TEST-c5d11e40-96c2-420b-b5ee-9d91ba05b6a8", {
                    locale: 'es-AR'
                })

                mp.checkout({
                    preference: {
                        id: data.global
                    },
                    render: {
                        container: '.cho-container',
                        label: 'Pagar',
                    }
                });
            }
        }

        // Here we just execute the function
        fetchCheckout()

        // Here we just execute the function
        fetchCheckout()
    }, [])
    return (
        <>
            <div className="cho-container"></div>
        </>
    );
}

export default CheckoutMP;