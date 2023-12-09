import { useEffect, useState } from 'react';
import styles from './Marcas.module.css'
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const Marcas = () => {


    const [marcas, setMarcas] = useState([])


    useEffect(() => {

        const marcasRef = collection(db, "marcas")

        getDocs(marcasRef)
            .then((resp) => {
                const docs = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                setMarcas(docs);
            })
            .catch((error) => {
                Toastify({
                    text: `Ocurrio un error: ${error}`,
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            });
    }, [])

    return (
        <section className={styles.containerSeccionMarcas}>
            <h1 className={styles.titulo}>Selecciona la Marca</h1>
            <div className={styles.containerSection}>
                {marcas.map(marcaDetail => <article key={marcaDetail.id} className={styles.containerImg}>
                    <Link to={`/crear-funda/seleccion/${marcaDetail.nombre}`}><img src={marcaDetail.image} alt="" /></Link>
                </article>)}

            </div>
        </section>
    );
}
