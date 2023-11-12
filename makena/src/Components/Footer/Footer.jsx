import { Link } from 'react-router-dom';
import styles from './Footer.module.css'
import { BsTelephoneFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import { BiLogoGmail } from "react-icons/bi";
import { BiLogoInstagram } from "react-icons/bi";


const Footer = () => {
    return (
        
            <footer className={styles.footer}>
                <div className={styles.categories}>
                    <h4 className={styles.categoriasTitle}>Categorias</h4>
                    <Link to={'/'}><p className={styles.icon}>Inicio</p></Link>
                    <Link to={'/crear-funda/seleccion'}><p className={styles.icon}>Crear Funda</p></Link>
                    <Link to={'/contacto'}><p className={styles.icon}>Contacto</p></Link>
                </div>

                <div className={styles.container}>
                    <h4 className={styles.categoriasTitle}>Contacto</h4>
                        <p><SiWhatsapp className={styles.icons}/> 1122444188</p>
                        <p><BsTelephoneFill className={styles.icons}/>1122444188</p>
                        <p className={styles.p}><BiLogoGmail className={styles.icons}/>ventas@makenafundas.com</p>
                </div>
            </footer>
        
    );
}

export default Footer;