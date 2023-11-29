import styles from './Presentacion.module.css'
import { Link } from "react-router-dom";


const Presentacion = () => {
    return (

            <div className={styles.divContenedor}>
                <div>
                    <h1>Fundas a tu gusto</h1>
                    <button className={styles.btn}><Link className={styles.link} to={'/crear-funda/seleccion'}>Crea tu funda</Link></button>
                </div>
        </div>



    );
}

export default Presentacion;