import { db } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";



const CheckoutSucces = ( orderData ) => {

    const handlePago = async () => {
        try {
            // Envía los datos del pedido a Firebase
            const docRef = await addDoc(collection(db, "pedidos"), orderData);
            return docRef
        } catch (error) {
            console.error("Error al registrar el pedido:", error);
        }
    };

    return (
        <div onLoad={handlePago()}>
            <h1>succes</h1>
        </div>
    );
}

export default CheckoutSucces;