import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemDetailProd from "../ItemDetailProd/ItemDetailProd"



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
                    console.log("El documento no existe.");
                }
            } catch (error) {
                console.error("Error al obtener el documento:", error);
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