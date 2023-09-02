import { Link,useLocation } from "react-router-dom";
import Grilla0 from '../../../public/Grilla0.png'
import grilla1 from "../../../public/grilla1.png"
import grilla2 from "../../../public/grilla2.png"
import grilla3 from "../../../public/grilla3.png"



const DistribucionImg = () => {

    const location  = useLocation()
    const id = location.search.split("=")[1]

    return (
        <section>
            <Link to={`/detail/${id}?tipoGrilla=${0}`}>
                <img src={Grilla0} alt="" />
            </Link>
            <Link to= {`/detail/${id}?tipoGrilla=${1}`}>
                <img src={grilla1} alt="grillaImage" />
            </Link>
            <Link to= {`/detail/${id}?tipoGrilla=${2}`}>
                <img src={grilla2} alt="grillaImage" />
            </Link>
            <Link to= {`/detail/${id}?tipoGrilla=${3}`}>
                <img src={grilla3} alt="grillaImage" />
            </Link>
        </section>
    );
}

export default DistribucionImg;