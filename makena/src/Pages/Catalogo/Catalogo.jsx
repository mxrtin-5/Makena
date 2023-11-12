/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemCard from "../../Components/ItemCard/ItemCard";
import styles from './Catalogo.module.css'
import MenuDropdown from "../../Components/MenuDropdown/MenuDropdown";


const Catalogo = () => {

    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    const [categorias, setCategorias] = useState([]);

    const [showSubCategories, setShowSubCategories] = useState(false);

    const [subCategorySelected, setSubCategorySelected] = useState("");

    const handleCategoryClick = ({nombre, subcategorias}) => {
        console.log('funcionando perro')
        console.log(nombre, subcategorias)
        filterCategory(nombre);
        // setValueSelected(category.nombre);
        // setShowSubCategories(category.subcategorias.length > 0);
        // setSubCategorySelected("");
    };

    const handleSubCategoryClick = (subCategory, category) => {
        setSubCategorySelected(subCategory.nombre);
        filterCategory(subCategory.nombre, category.nombre);
        setShowSubCategories(false);
    };

    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "catalogo");

            const response = await getDocs(productosRef);
            const docs = response.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const categoriasUtilizadas = docs.reduce((categorias, prod) => {
                if (Array.isArray(prod.categoria)) {
                    prod.categoria.forEach((cat) => {
                        if (cat !== "TODO") {
                            categorias.add(cat);
                        }
                    });
                }
                return categorias;
            }, new Set());

            const categoriasData = Array.from(categoriasUtilizadas).map((cat) => {
                    console.log(cat)
                return ({
                    nombre: cat,
                    subcategorias: [],
                })
            });

            setCategorias(categoriasData);
            setProductos(docs);
        };

        fetchProductos();
        setProductosFiltrados(productos)
    }, []);

    const filterCategory = (categoria) => {
            setProductosFiltrados(() =>
                productos.filter((prod) =>
                    Array.isArray(prod.categoria) ? prod.categoria.includes(categoria) : false
                )
            );
    };

    return (
        <section className={styles.section} >
            <h1>Productos Destacados</h1>

            <MenuDropdown
                {...{
                    categorias, 
                    handleCategoryClick, 
                    handleSubCategoryClick, 
                    setSubCategorySelected
                }}
            />
            <div className={styles.prods}>
                {productosFiltrados.map((elemento) => (
                    <ItemCard
                        id={elemento.id}
                        name={elemento.name}
                        price={elemento.price}
                        image={elemento.image}
                        key={elemento.id}
                    />
                ))}
            </div>
        </section>
    );
};

export default Catalogo;
