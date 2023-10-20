import { Link } from 'react-router-dom';
import styles from './ItemCard.module.css'


const ItemCard = ({ id, image, name, price}) => {
    return (
        <section className={styles.container}>
            <div className={styles.div}>
                <h4 className={styles.titulo}>{name}</h4>
                <img className={styles.image} src={image} alt="Imagen" />
                <p><span>Precio:</span> ${price}</p>
                <Link to={`/detail/${id}`}><button>Ver detalles</button></Link>
            </div>
        </section>
    );
}

export default ItemCard;