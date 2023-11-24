import styles from './Devs.module.css'
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Devs = () => {
    return (
        <div className={styles.divDevs}>
            <h1 className={styles.developer}>Developer</h1>
            <p className={styles.dev}>Martin Eluney Gonzalez</p>

            <p className={styles.titulo}>Front End Developer</p>

            <div className={styles.divLinks}>
                <a className={styles.links} href='https://www.linkedin.com/in/martin-gonzalez-doomed/'><FaLinkedin /></a>

                <a className={styles.links} href='https://www.instagram.com/mxrtin_5._/?hl=es'><FaInstagramSquare /></a>
            </div>


        </div>
    );
}

export default Devs;