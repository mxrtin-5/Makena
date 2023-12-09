import { db } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import styles from './CheckoutSucces.module.css'
import { useContext, useEffect } from "react";
import { DataContext } from "../../../context/dataContext";


const CheckoutSucces = () => {

    const { orderData, setOrderData } = useContext(DataContext)

    useEffect(() => {
        const handlePago = async () => {
            try {
                console.log('Order Data:', orderData);

                if (typeof orderData === 'object' && orderData !== null) {
                    await addDoc(collection(db, 'pedidos'), orderData);
                } else {
                    console.error('Error: orderData no es un objeto válido');
                }
            } catch (error) {
                console.error('Error al registrar el pedido:', error);
            }
        }

        if (orderData && typeof orderData === 'object') {
            handlePago()
        } else {
            console.error('Error: orderData no es un objeto válido');
        }
    }, [orderData, setOrderData]);


    return (
        <div className={styles.divPadre}>
            <h1>Su compra se ha realizado con exito</h1>
        </div>
    );
}

export default CheckoutSucces;