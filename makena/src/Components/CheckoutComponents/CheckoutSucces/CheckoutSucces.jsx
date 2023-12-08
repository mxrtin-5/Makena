import { db } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import styles from './CheckoutSucces.module.css'
import { useEffect } from "react";


const CheckoutSucces = ({ orderData, setOrderData }) => {

    useEffect(() => {
        const handlePago = async () => {
            try {
                // Envía los datos del pedido a Firebase
                const docRef = await addDoc(collection(db, 'pedidos'), orderData);
                console.log('Pedido registrado con éxito:', docRef.id);
            } catch (error) {
                console.error('Error al registrar el pedido:', error);
            }
        };

        if (orderData) {
            handlePago();
        }
    }, [orderData, setOrderData]);


    return (
        <div className={styles.divPadre}>
            <h1>Su compra se ha realizado con exito</h1>

            <p>Id: {id}</p>
        </div>
    );
}

export default CheckoutSucces;