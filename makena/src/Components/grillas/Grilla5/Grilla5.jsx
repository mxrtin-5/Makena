import { useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import img from '/prueba-removebg-previesssssw.png'
import styles from './Grilla5.module.css'


const Grilla5 = () => {
    const [imagenes, setImagenes] = useState([]);

    const handleAddImageShow = (cloudData) => {
        setImagenes((prevState) => {
            let newState = [cloudData, ...prevState];
            return newState;
        });
    };

    return (
        <>
            <div className={styles.marco}>
                <img className={styles.marcoImg} src={img} alt="" />

                <div className={styles.contenedorImgs}>
                    <div className={styles.parteArriba}>
                        {imagenes.slice(1, 2).map((imgData) => (
                            <img className={styles.imagen} src={imgData.url} alt="" />
                        ))}
                    </div>

                    <div className={styles.parteAbajo}>
                        {imagenes.slice(1, 2).map((imgData) => (
                            <img className={styles.imagen} src={imgData.url} alt="" />
                        ))}
                    </div>
                </div>
            </div>

            <UploadWidget getImageData={handleAddImageShow} />
        </>
    );
}

export default Grilla5;