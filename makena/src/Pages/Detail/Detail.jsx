import styles from './Detail.module.css'
import { useLocation, useParams } from "react-router-dom";
import Grilla0 from '../../Components/grillas/Grilla0/Grilla0'
import Grilla2 from '../../Components/grillas/Grilla2/Grilla2';
import Grilla3 from '../../Components/grillas/Grilla3/Grilla3';
import Grilla4 from '../../Components/grillas/Grilla4/Grilla4';
import Grilla5 from '../../Components/grillas/Grilla5/Grilla5';
import Grilla1 from '../../Components/grillas/Grilla1/Grilla1';


const Detail = () => {
    const { id } = useParams() //! despues mira como traer el detalle de firebase solo para este telefono
    const location = useLocation()
    const idGrilla = location.search.split("=")[1]

    const selectGrid = (idGrilla) => {
        switch (idGrilla) {
            case "0":
                return <Grilla0 />
            case "1":
                return <Grilla1 />

            case "2":
                return <Grilla2 />
            case "3":
                return <Grilla3 />
            case "4":
                return <Grilla4 />
            case "5":
                return <Grilla5 />
            default:
                return <p>grilla 10</p>;
        }
    }



    return (
        <section className={styles.container}>
            {selectGrid(idGrilla)}

        </section>
    );
}

export default Detail;







