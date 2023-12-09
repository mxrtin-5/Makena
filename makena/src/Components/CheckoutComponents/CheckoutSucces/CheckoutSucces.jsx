import { db } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import styles from './CheckoutSucces.module.css'
import { useContext, useEffect } from "react";
import { DataContext } from "../../../context/dataContext";
import "toastify-js/src/toastify.css";
import Toastify from 'toastify-js';


const CheckoutSucces = () => {

    const { orderData } = useContext(DataContext);

    useEffect(() => {
        const handlePago = async () => {
            try {
                console.log('Order Data:', orderData);

                if (typeof orderData === 'object' && Object.keys(orderData).length > 0) {
                    await addDoc(collection(db, 'pedidos'), orderData);
                } else {
                    Toastify({
                        text: `Error: orderData no es un objeto valido`,
                        className: "info",
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                    }).showToast();
                }
            } catch (error) {
                Toastify({
                    text: `Ocurrio un error ${error}`,
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            }
        }

        if (orderData && typeof orderData === 'object') {
            handlePago()
        } else {
            Toastify({
                text: `Error: orderData no es un objeto valido`,
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        }
    }, [orderData]);

    return (
        <div className={styles.divPadre}>
            <h1>Su compra se ha realizado con éxito</h1>
        </div>
    );
}

export default CheckoutSucces;