import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useFetchProducts = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);

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
}