import { Link } from "react-router-dom";
import styles from './ItemCard.module.css'

const ItemCard = ({ item }) => {

    return (
        <div className={styles.container}>
            <div className={styles.containerProds} key={item.id}>
                <Link to={`/crear-funda/seleccion/distribucion?id=${item.id}`}>
                    <h4 className={styles.tituloProducto}> {item.nombre} </h4>
                </Link>

            </div>
        </div>
    );
}

export default ItemCard;
