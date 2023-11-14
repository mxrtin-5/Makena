import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useFetchProducts = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
<<<<<<< HEAD

=======
    
>>>>>>> 914d9bde88490199a5494393b5c318ac94051354
    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "catalogo");

            const response = await getDocs(productosRef);
            const docs = response.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProductos(docs);
        };
        fetchProductos();
    }, []);

    useEffect(() => {
        setProductosFiltrados(productos)
    }, [productos])

<<<<<<< HEAD

    const filterCategory = (categoria) => {
        if (!categoria) {
            setProductosFiltrados(productos)
        } else setProductosFiltrados(() =>
            productos.filter((prod) => prod.categorias.categoria === categoria)
        )
    };


    const filterSubCategory = (subCat) => {
        setProductosFiltrados(() =>
            productos.filter((prod) => prod.categorias.subcategoria === subCat)
        )
    };

    return [
        filterCategory,
        productosFiltrados,
        productos,
        filterSubCategory
    ]
=======
    
    const filterCategory = (categoria) => {
        if(!categoria) {
            setProductosFiltrados(productos)
        } else setProductosFiltrados(() =>
                productos.filter((prod) => prod.categorias.categoria === categoria)
                )
    };

    
    const filterSubCategory = (subCat) => {
        setProductosFiltrados(() =>
            productos.filter((prod) => prod.categorias.subcategoria === subCat)
            )
    };

return [
    filterCategory,
    productosFiltrados,
    productos,
    filterSubCategory
]
>>>>>>> 914d9bde88490199a5494393b5c318ac94051354
}