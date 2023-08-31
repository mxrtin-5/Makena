import styles from './Marcas.module.css'
import { Link } from "react-router-dom";

const Marcas = () => {
    return (
        <section className={styles.containerSeccionMarcas}>
            <div className={styles.containerSection}>
                <div className={styles.containerImg}>
                    <Link to='/iphone'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418609/wfuimcaryk9ltpb4lnmx.png" alt="" /></Link>
                </div>
                <div className={styles.containerImg}>
                    <Link to='/samsung'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418624/jmwahnu91gmtnyt7sf4i.png" alt="" /></Link>
                </div>
                <div className={styles.containerImg}>
                    <Link to='/huawei'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418605/vicjcaqkhy5btqj88rsq.png" alt="" /></Link>
                </div>
                <div className={styles.containerImg}>
                    <Link to='/seleccion-xiaomi/123'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418617/baiq2vdj73d6g1rrwcjc.png" alt="" /></Link>
                </div>
                <div className={styles.containerImg}>
                    <Link to='/lg'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418613/frhqyg6ch2yycrd61hmh.png" alt="" /></Link>
                </div>
                <div className={styles.containerImg}>
                    <Link to='/sony'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418628/wvocpmd2lsaai2u7pxj0.png" alt="" /></Link>
                </div>

            </div>
        </section>
    );
}

export default Marcas;