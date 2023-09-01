import Problematica from '../../Components/Ploblematica/Problematica';
import Presentacion from '../../Components/Presentacion/Presentacion';
import Solucion from '../../Components/Solucion/Solucion';
import styles from './Home.module.css'


const Home = () => {

    return (
        <section className={styles.sectionHome}>
            <img className={styles.backgroundImg} src="../../public/en-gb.webp" alt="" />
            <Presentacion />

            <div>
                <Problematica className={styles.componentContainer} />

                <Solucion />
            </div>


        </section>

    );
}

export default Home;