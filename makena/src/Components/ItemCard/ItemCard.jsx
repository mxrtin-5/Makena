import { Link } from 'react-router-dom';
import styles from './ItemCard.module.css'


const ItemCard = ({ id, image, name}) => {
    
    return (
        <section data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-offset="0" data-aos="zoom-in" className={styles.container}>
            <Link className={styles.link} to={`/detail/${id}`}><div className={styles.div}>
                <h4 className={styles.titulo}>{name}</h4>
                <img className={styles.image} src={image} alt="Imagen" />
            </div></Link>

        </section>
    );
}

export default ItemCard;