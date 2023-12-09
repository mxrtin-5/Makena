import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Loader from "../Loader/Loader";
import Seleccion from './SeleccionXiaomi/Seleccion'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


const ItemListContainer = () => {

    const [celulares, setCelulares] = useState([])
    const [loading, setLoading] = useState(true)

    const { marca } = useParams()

    useEffect(() => {

        setLoading(true)

        //1 armo la referencia
        const productosRef = collection(db, "celulares")

        //2 filtro los datos por la marca
        const q = marca
            ? query(productosRef, where("marca", "==", marca))
            : productosRef

        //3 obtengo los documentos
        getDocs(q)
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
            .finally(() => setLoading(false))

    }, [marca])



    return (
        <section>

            {
                loading
                    ? <Loader />
                    : <Seleccion celulares={celulares} />
            }

        </section>
    );
}

export default ItemListContainer;