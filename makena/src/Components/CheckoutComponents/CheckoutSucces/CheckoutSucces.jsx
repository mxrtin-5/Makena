import { db } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import styles from './CheckoutSucces.module.css'


const CheckoutSucces = ({ orderData, id }) => {

    
        const handlePago = async () => {
            try {
                // Envía los datos del pedido a Firebase
                const docRef = await addDoc(collection(db, "pedidos"), orderData);
                return docRef
            } catch (error) {
                console.error("Error al registrar el pedido:", error);
            }
        };

    console.log(orderData);

    return (
        <div className={styles.divPadre} onLoad={handlePago()}>
            <h1>Su compra se ha realizado con exito</h1>

            <p>Id: {id}</p>
        </div>
    );
}

export default CheckoutSucces;