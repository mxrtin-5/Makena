import { useEffect, useState } from "react";
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemCard from "../../Components/ItemCard/ItemCard";
import styles from './Catalogo.module.css'
import { AiOutlineArrowDown } from 'react-icons/ai'; // Importa el icono
import { AiOutlineArrowUp } from "react-icons/ai";
import MenuDropdown from "../../Components/MenuDropdown/MenuDropdown";


const Catalogo = () => {

    const [productos, setProductos] = useState([]);

    const[categorias, setCategorias] = useState(["Todo", "Anime", "Deporte"]);

    const subCategoriasAnime = ["One Piece", "Naruto", "Dragon Ball"];

    const[menu, setMenu] = useState(null)

    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, 'catalogo');
            let query1 = productosRef;

            const response = await getDocs(query1);
            const docs = response.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProductos(docs);
        };

        fetchProductos();
    }, []);

    const toggleMenu = () =>{
        setMenu(!menu)
    }


    return (
        <section className={styles.section} >
            <h1>Productos Destacados</h1>

            <div className={styles.div}>
                {
                    categorias.map((cat) =>(
                        <div className={styles.divMap}>
                            <ul className={styles.ul}>
                                <li key={cat}>
                                    <button className={styles.a} href="">
                                        {cat}
                                    </button>
                                    <AiOutlineArrowDown className={styles.icon} onClick={toggleMenu}   />
                                </li>
                            </ul>
                        </div>
                    ) )
                }
            </div>

            {
                menu ? <MenuDropdown subCategoriasAnime={subCategoriasAnime} />
                    : null
            }

            <div className={styles.prods}>
                {productos.map((elemento) => (
                    <ItemCard
                        id={elemento.id}
                        name={elemento.name}
                        price={elemento.price}
                        image={elemento.image}
                    />
                ))}
            </div>
        </section>
    );
};

export default Catalogo;
