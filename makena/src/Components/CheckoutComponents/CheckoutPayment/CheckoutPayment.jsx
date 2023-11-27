import { db } from '../../../firebase/config'
import { addDoc, collection } from 'firebase/firestore';
import styles from './CheckoutPayment.module.css'
import ButtonMP from '../../buttonMP/ButtonMP';

const CheckoutPayment = ({ orderData }) => {

const pedido = {
    ...orderData
}

    const handlePago = async () => {
        try {
            // Envía los datos del pedido a Firebase
            const docRef = await addDoc(collection(db, "pedidos"), pedido);
            return docRef
        } catch (error) {
            console.error("Error al registrar el pedido:", error);
        }
    };

    return (
        <div className={styles.payment}>
            <ButtonMP handlePago={handlePago} />
        </div>
    );
};

export default CheckoutPayment;