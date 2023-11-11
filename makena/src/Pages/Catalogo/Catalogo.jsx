import { useEffect, useRef, useState } from "react";
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemCard from "../../Components/ItemCard/ItemCard";
import styles from './Catalogo.module.css'
import MenuDropdown from "../../Components/MenuDropdown/MenuDropdown";


const Catalogo = () => {

    const [productos, setProductos] = useState([]);

    const [categorias, setCategorias] = useState([]);

    const [valueSelected, setValueSelected] = useState("");

    const [showSubCategories, setShowSubCategories] = useState(false);

    const [subCategorySelected, setSubCategorySelected] = useState("");

    const allProds = useRef([])

    console.log(allProds.current);

    const handleCategoryClick = (category) => {
        setValueSelected(category.nombre);
        filterCategory(category.nombre);
        setShowSubCategories(category.subcategorias.length > 0);
        setSubCategorySelected("");
    };

    const handleSubCategoryClick = (subCategory, category) => {
        setValueSelected(subCategory.nombre);
        setSubCategorySelected(subCategory.nombre);
        filterCategory(subCategory.nombre, category.nombre);
        setShowSubCategories(false);
    };

    console.log(productos);

    console.log(allProds.current);


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

            const categoriasData = Array.from(categoriasUtilizadas).map((cat) => ({
                nombre: cat,
                subcategorias: [],
            }));

            setCategorias(categoriasData);
            setProductos(docs);
            allProds.current = docs;
        };

        fetchProductos();
    }, []);

    console.log(allProds);

    const filterCategory = (categoria) => {
        setSelectedCategory(categoria);

        if (categoria === "Todo") {
            setProductos(allProds.current);
        } else {
            setProductos(() =>
                allProds.current.filter((prod) =>
                    Array.isArray(prod.categoria) ? prod.categoria.includes(categoria) : false
                )
            );
        }
    };

    console.log(productos);;

    return (
        <section className={styles.section} >
            <h1>Productos Destacados</h1>

            <MenuDropdown
                categorias={categorias}
                handleCategoryClick={handleCategoryClick}
                subCategorySelected={subCategorySelected}
                setSubCategorySelected={setSubCategorySelected} />

            <div className={styles.prods}>
                {productos.map((elemento) => (
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
