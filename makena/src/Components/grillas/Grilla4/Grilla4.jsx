import { useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import img from '/prueba-removebg-previesssssw.png'
import styles from './Grilla4.module.css'


const Grilla4 = () => {

    const [imagenes, setImagenes] = useState([])

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
                    <div className={styles.image}>
                        {imagenes.length > 0 && <img src={imagenes[0].url} className={styles.imagen} />}
                    </div>

                    <div className={styles.parteAbajo}>
                        {imagenes.slice(1).map((imgData) => (
                            <img className={styles.imagen} src={imgData.url} />
                        ))}
                    </div>
                </div>
            </div>

            <UploadWidget getImageData={handleAddImageShow} />
        </>
    );
}

export default Grilla4;