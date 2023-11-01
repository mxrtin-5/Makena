import { TbTruckDelivery } from "react-icons/tb";
import styles from './InfoHome.module.css'
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";


const InfoHome = () => {
    return (
        <section className={styles.section}>
            <div className={styles.envios}>
                <TbTruckDelivery className={styles.icon} />
                <p className={styles.p}>Datos de entrega</p>
            </div>

            <div className={styles.infoPerso}>
                <p className={styles.p}>Datos de Perso</p>
                <HiOutlineDevicePhoneMobile />
            </div>
        </section>
    );
}

export default InfoHome;