import { useEffect, useState } from "react";
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useParams } from "react-router-dom";
import ItemCard from "../../Components/ItemCard/ItemCard";
import styles from './Catalogo.module.css'


const Catalogo = () => {

    const [productos, setProductos] = useState([])

    const { id } = useParams()


    useEffect(() => {
        console.log('Ejecutando useEffect');

        const productosRef = collection(db, 'catalogo')

        getDocs(productosRef)
            .then((resp) => {
                const docs = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }
                })
                setProductos(docs)
            })
            .catch((error) => {
                console.log(error);
            })


    }, [id])

    return (
        <section className={styles.section}>
            <h1>Productos Destacados</h1>

            <div className={styles.divPadre}>
                {
                    productos.map((elemento) => <ItemCard id={elemento.id} name={elemento.name} price={elemento.price} image={elemento.image} />)
                }
            </div>

        </section>
    );
}

export default Catalogo;