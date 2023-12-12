import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemCardHome from "../ItemCardHome/ItemCardHome";
import styles from './CatalogoHome.module.css'


const CatralogoHome = () => {

    const { marca } = useParams();

    const [celulares, setCelulares] = useState([]);

    useEffect(() => {


        //1 armo la referencia
        const productosRef = collection(db, "destacados")
        //3 obtengo los documentos
        getDocs(productosRef)
            .then((resp) => {
                const docs = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })

                setCelulares(docs);

            })
            .catch((error) => {
                Toastify({
                    text: `Ocurrio un error ${error}`,
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            })
    }, [marca])


    return (
        <div className={styles.divP}>
            {
                celulares.map((elemento) => (
                    <ItemCardHome
                        id={elemento.id}
                        name={elemento.name}
                        price={elemento.price}
                        image={elemento.image}
                        key={elemento.id}
                    />
                ))
            }
        </div>
    );
}

export default CatralogoHome;