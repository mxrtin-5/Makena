import styles from './Detail.module.css'
import { useLocation, useParams } from "react-router-dom";
import Grilla1 from '../../Components/grillas/grilla1/Grilla1';
import Grilla0 from '../../Components/grillas/Grilla0/Grilla0'


const Detail = () => {
    const { id } = useParams() //! despues mira como traer el detalle de firebase solo para este telefono
    const location = useLocation()
    const idGrilla = location.search.split("=")[1]


    return (
        <section className={styles.container}>
            {selectGrid(idGrilla)}

        </section>
    );
}

export default Detail;



const selectGrid = (idGrilla) => {
    switch (idGrilla) {
        case "0":
            return <Grilla0  />
        case "1":
            return <Grilla1  />

        case "2":
            return <p>grilla 2</p>
        case 3:
            return <p>grilla 3</p>
        default:
            return <p>grilla 10</p>;
    }
}




