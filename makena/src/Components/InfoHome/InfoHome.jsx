import { TbTruckDelivery } from "react-icons/tb";
import styles from './InfoHome.module.css'
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";


const InfoHome = () => {
    return (
        <section className={styles.section}>
            <div>
                <div className={styles.envios}>
                    <TbTruckDelivery className={styles.icon} />
                    <h4 className={styles.titulo}>Envios</h4>
                    <div className={styles.divP}>
                        <p className={styles.p}>Por mensajeria o correo argentino</p>
                        <p className={styles.p}>El producto demora entre</p>
                        <p className={styles.p}>24hs y 72hs habiles en</p>
                        <p className={styles.p}>Ser despachado</p>
                    </div>
                </div>

                <div className={styles.infoPerso}>
                    <div className={styles.divC}>
                        <h4 className={styles.titulo2}>Contacto</h4>
                        <p className={styles.pContacto}>1121444188</p>
                        <p className={styles.pContacto}><FaInstagram />@makenafundas</p>
                        <p className={styles.pContacto}><BiLogoGmail /> info@makenafundas.com</p>
                        <p className={styles.pContacto}>Por venta mayorista:</p>
                        <p className={styles.pContacto}><BiLogoGmail /> ventas@makenafundas.com</p>
                        <p className={styles.pContacto}>o Whatsapp</p>
                    </div>
                    <HiOutlineDevicePhoneMobile className={styles.icon} />

                </div>
            </div>
        </section>
    );
}

export default InfoHome;