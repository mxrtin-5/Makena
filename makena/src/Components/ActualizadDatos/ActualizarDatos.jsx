import { collection, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";
import styles from './ActualizarDatos.module.css'


const ActualizarDatos = () => {

    const [newPrice, setNewPrice] = useState('');

    const handlePriceChange = (event) => {
        setNewPrice(event.target.value); // Actualiza el estado del nuevo precio cuando cambia el input
    };

    // Define una función asincrónica para actualizar los precios en una colección
    async function updatePricesInCollection(collectionName) {
        const productosRef = collection(db, collectionName);
        const q = query(productosRef);
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const updatedPrice = parseFloat(newPrice); // Utiliza el nuevo precio ingresado como valor
            await updateDoc(doc.ref, { price: updatedPrice });
        });
    }

    // Define las colecciones que deseas actualizar
    const collectionsToUpdate = ['catalogo', 'celulares'];

    // Llama a la función para actualizar los precios cuando se hace clic en el botón
    const handleUpdatePricesClick = async () => {
        try {
            for (const collectionName of collectionsToUpdate) {
                await updatePricesInCollection(collectionName);
            }
            console.log('Precios actualizados con éxito');
        } catch (error) {
            console.error('Error al actualizar los precios:', error);
        }
    };


    return (
        <section className={styles.section}>
            <div className={styles.divInputs}>
                <input
                    type="number"
                    placeholder="Nuevo Precio"
                    value={newPrice}
                    onChange={handlePriceChange}
                />
                <button onClick={handleUpdatePricesClick}>Actualizar Precios</button>
            </div>

        </section>
    );
}

export default ActualizarDatos;