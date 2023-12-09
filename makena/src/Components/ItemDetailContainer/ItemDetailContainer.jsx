import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemDetailProd from "../ItemDetailProd/ItemDetailProd"
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const ItemDetailContainer = () => {

    const [productos, setProductos] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const productoRef = doc(db, 'catalogo', id);
                const docSnap = await getDoc(productoRef);

                if (docSnap.exists()) {
                    const productoData = docSnap.data();
                    setProductos({
                        id: docSnap.id,
                        ...productoData
                    });
                } else {
                    Toastify({
                        text: "Ocurrio un error",
                        className: "info",
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                    }).showToast();
                }
            } catch (error) {
                Toastify({
                    text: `Error al obtener el documento: ${error}`,
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            }
        };

        fetchProducto();
    }, [id]);

    return (
        <div>
            {
                <ItemDetailProd item={productos} />
            }
        </div>
    );
}

export default ItemDetailContainer;