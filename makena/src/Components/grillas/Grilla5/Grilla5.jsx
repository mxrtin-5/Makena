import { useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import img from '/prueba-removebg-previesssssw.png'
import styles from './Grilla5.module.css'


const Grilla5 = ({ phoneImg }) => {
    const [imagenes, setImagenes] = useState([]);

    const handleAddImageShow = (cloudData) => {
        setImagenes((prevState) => {
            let newState = [...prevState, cloudData];
            return newState;
        });
    };


    return (
        <>
            <div className={styles.marco}>
                <img className={styles.marcoImg} src={phoneImg} alt="" />

                <div className={styles.contenedorImgs}>
                    <div className={styles.parteArriba}>
                        {imagenes && imagenes.length > 0 && <img src={imagenes[0].url} className={styles.imagen} />}
                        {imagenes && imagenes.length > 1 && <img src={imagenes[1].url} className={styles.imagen} />}
                    </div>


                    <div className={styles.parteAbajo}>
                        {imagenes && imagenes.length > 2 && <img src={imagenes[2].url} className={styles.imagen} />}
                    </div>


                    <div className={styles.parteArriba}>
                        {imagenes && imagenes.length > 3 && <img src={imagenes[3].url} className={styles.imagen} />}
                        {imagenes && imagenes.length > 4 && <img src={imagenes[4].url} className={styles.imagen} />}
                    </div>
                    <div className={styles.parteAbajo}>
                        {imagenes && imagenes.length > 5 && <img src={imagenes[5].url} className={styles.imagen} />}

                    </div>
                </div>
            </div>

            <UploadWidget getImageData={handleAddImageShow} />
        </>
    );
}

export default Grilla5;