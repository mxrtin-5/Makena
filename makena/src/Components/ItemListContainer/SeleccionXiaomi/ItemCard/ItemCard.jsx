import { Link } from "react-router-dom";
import styles from './ItemCard.module.css'

const ItemCard = ({ item }) => {

    return (
        <div className={styles.container}>
            <div className={styles.containerProds} key={item.id}>
                <Link to={`/crear-funda/seleccion/distribucion?id=${item.id}`}> //!cambiar por la page de distribucion
                    <h4 className={styles.tituloProducto}> {item.nombre} </h4>
                    <img className={styles.product} src={item.image} alt="" />
                </Link>

            </div>
        </div>
    );
}

export default ItemCard;



//elegir marca ---> elegir celular ---id---> distribucion ----id----?,tipoDisctribucion---> detalle