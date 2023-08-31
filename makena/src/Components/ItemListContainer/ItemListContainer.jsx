import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Loader from "../Loader/Loader";
import SeleccionXiaomi from "./SeleccionXiaomi/SeleccionXiaomi";


const ItemListContainer = () => {

    const [celulares, setCelulares] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    console.log("porongaaaaaa");

    useEffect(() => {

        setLoading(true)

        //1 armo la referencia

        const productosRef = collection(db, "celulares")

        const q = categoryId
            ? query(productosRef, where("marca", "==", categoryId))
            : productosRef

        //2 llamo a la referencia
        getDocs(q)
            .then((resp) => {
                const docs = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                console.log("Datos de Firebase:", docs);
                console.log("Estado de celulares antes de actualizar:", celulares);
                setCelulares(docs);
                console.log("Estado de celulares después de actualizar:", celulares)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))

        console.log("celulares:", celulares);

    }, [categoryId])

    console.log(celulares);

    return (
        <section>

            {
                loading
                    ? <Loader />
                    : <SeleccionXiaomi celulares={celulares} />
            }

        </section>
    );
}

export default ItemListContainer;