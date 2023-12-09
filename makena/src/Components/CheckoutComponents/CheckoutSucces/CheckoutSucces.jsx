import { db } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import styles from './CheckoutSucces.module.css'
import { useContext, useEffect } from "react";
import { DataContext } from "../../../context/dataContext";


const CheckoutSucces = () => {

    const { orderData } = useContext(DataContext)

    useEffect(() => {
        const handlePago = async () => {
            try {
                console.log('Order Data:', orderData);
                // Envía los datos del pedido a Firebase
                await addDoc(collection(db, 'pedidos'), orderData);
            } catch (error) {
                console.error('Error al registrar el pedido:', error);
            }
        };


        handlePago();

    }, [orderData]);


    return (
        <div className={styles.divPadre}>
            <h1>Su compra se ha realizado con exito</h1>
        </div>
    );
}

export default CheckoutSucces;