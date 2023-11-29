import { Link, useLocation } from "react-router-dom";
import Grilla0 from '/Grilla1Min.png'
import grilla1 from "/Grilla2Min.png"
import grilla2 from "/Grilla3Min.png"
import grilla3 from "/Grilla4Min.png"
import grilla4 from "/Grilla-5.png"
import styles from './Distribucion.module.css'


const DistribucionImg = () => {

    const location = useLocation()
    const id = location.search.split("=")[1]
    const modelo = location.search.split("=")[2]

    return (
        <section className={styles.sectionContainer}>
            <div className={styles.containerGrid}>
                <Link className={styles.link} to={`/crear-funda/seleccion/:${modelo}/${id}?tipoGrilla=${0}`}>
                    <img src={Grilla0} alt="grillaImage" />
                </Link>
                <Link className={styles.link} to={`/crear-funda/seleccion/:${modelo}/${id}?tipoGrilla=${1}`}>
                    <img src={grilla1} alt="grillaImage" />
                </Link>
                <Link className={styles.link} to={`/crear-funda/seleccion/:${modelo}/${id}?tipoGrilla=${2}`}>
                    <img src={grilla2} alt="grillaImage" />
                </Link>
                <Link className={styles.link} to={`/crear-funda/seleccion/:${modelo}/${id}?tipoGrilla=${3}`}>
                    <img src={grilla3} alt="grillaImage" />
                </Link>
                <Link className={styles.link} to={`/crear-funda/seleccion/:${modelo}/${id}?tipoGrilla=${4}`}>
                    <img src={grilla4} alt="grillaImage" />
                </Link>
            </div>

        </section>
    );
}

export default DistribucionImg;