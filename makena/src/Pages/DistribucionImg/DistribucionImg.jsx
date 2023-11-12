import { Link, useLocation } from "react-router-dom";
import Grilla0 from '/Grilla0.png'
import grilla1 from "/grilla1.png"
import grilla2 from "/grilla2.png"
import grilla3 from "/grilla3.png"
import grilla4 from "/grilla4.png"
import styles from './Distribucion.module.css'


const DistribucionImg = () => {

    const location = useLocation()
    const id = location.search.split("=")[1]
    const modelo = location.search.split("=")[2]

    console.log(modelo);

    return (
        <section className={styles.sectionContainer}>
            <Link to={`/crear-funda/seleccion/:${modelo}/${id}?tipoGrilla=${0}`}>
                <img src={Grilla0} alt="grillaImage" />
            </Link>
            <Link to={`/crear-funda/seleccion/:${modelo}/${id}?tipoGrilla=${1}`}>
                <img src={grilla1} alt="grillaImage" />
            </Link>
            <Link to={`/crear-funda/seleccion/:${modelo}/${id}?tipoGrilla=${2}`}>
                <img src={grilla2} alt="grillaImage" />
            </Link>
            <Link to={`/crear-funda/seleccion/:${modelo}/${id}?tipoGrilla=${3}`}>
                <img src={grilla3} alt="grillaImage" />
            </Link>
            <Link to={`/crear-funda/seleccion/:${modelo}/${id}?tipoGrilla=${4}`}>
                <img src={grilla4} alt="grillaImage" />
            </Link>
        </section>
    );
}

export default DistribucionImg;