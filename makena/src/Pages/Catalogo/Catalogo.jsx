import { useEffect, useState } from "react";
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemCard from "../../Components/ItemCard/ItemCard";
import styles from './Catalogo.module.css'
import { AiOutlineArrowDown } from 'react-icons/ai'; // Importa el icono

const Catalogo = () => {

    const [productos, setProductos] = useState([]);

    const [filtroCategoria, setFiltroCategoria] = useState('');

    const [subCategoria, setSubCategoria] = useState('');

    const [categorias, setCategorias] = useState([]);

    console.log(categorias);


    useEffect(() => {
        const fetchCategorias = async () => {
            const categoriasRef = collection(db, 'catalogo');
            const categoriasSnapshot = await getDocs(categoriasRef);
            const categoriasData = {
                Todo: [],
                Anime: [],
                Deporte: [],
            };

            categoriasSnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.categoria) {
                    const categorias = data.categoria;
                    if (categorias.includes("Todo")) {
                        categoriasData["Todo"].push(data.nombre);
                    }
                    if (categorias.includes("Anime")) {
                        categoriasData["Anime"].push(data.nombre);
                    }
                    if (categorias.includes("Deporte")) {
                        categoriasData["Deporte"].push(data.nombre);
                    }
                }
            });

            setCategorias(categoriasData);
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        const productosRef = collection(db, 'catalogo');
        let query1 = productosRef;

        if (filtroCategoria) {
            query1 = query(productosRef, where('categoria', 'array-contains', filtroCategoria));
        }

        getDocs(query1)
            .then((resp) => {
                const docs = resp.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductos(docs);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [filtroCategoria, subCategoria]);

    const handleCategoriaClick = (categoria) => {
        setFiltroCategoria(categoria);
        setSubCategoria('');
    };

    const handleSubCategoriaClick = (subcategoria) => {
        setSubCategoria(subcategoria);
    };

    const toggleSubcategorias = (categoria) => {
        if (subCategoria === categoria) {
            setSubCategoria('');
        } else {
            setSubCategoria(categoria);
        }
    };

    return (
        <section className={styles.section}>
            <h1>Productos Destacados</h1>

            <nav className={styles.nav}>
                <ul className={styles.menuHorizontal}>
                    {Object.entries(categorias).map(([categoria, subcategorias]) => (
                        <li key={categoria}>
                            <div className={styles.menuItem}>
                                <a href="#" onClick={() => handleCategoriaClick(categoria)}>
                                    {categoria}
                                </a>
                                {subcategorias.length > 0 && (
                                    <AiOutlineArrowDown
                                        className={styles.arrowIcon}
                                        onClick={() => toggleSubcategorias(categoria)}
                                    />
                                )}
                            </div>
                            {subcategorias.length > 0 && subCategoria === categoria && (
                                <ul className={styles.menuVertical}>
                                    {subcategorias.map((subcategoria) => (
                                        <li key={subcategoria}>
                                            <a href="#" onClick={() => handleSubCategoriaClick(subcategoria)}>
                                                {subcategoria}
                                                {console.log(subCategoria)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.divPadre}>
                {productos.map((elemento) => (
                    <ItemCard id={elemento.id} name={elemento.name} price={elemento.price} image={elemento.image} />
                ))}
            </div>
        </section>
    );
}

export default Catalogo;