import { Link } from 'react-router-dom';
import styles from './ItemCardHome.module.css'


const ItemCardHome = ({ id, image, name, price }) => {
    
    return (
        <section data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-offset="0" data-aos="zoom-in" className={styles.container}>
            <Link className={styles.link} to={`/detail-destacado/${id}`}><div className={styles.div}>
                <h4 className={styles.titulo}>{name}</h4>
                <img className={styles.image} src={image} alt="Imagen" />
            </div></Link>

        </section>
    );
}

export default ItemCardHome;