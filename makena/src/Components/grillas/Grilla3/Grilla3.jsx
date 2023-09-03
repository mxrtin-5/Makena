import { useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import img from '/prueba-removebg-previesssssw.png'
import styles from './Grilla3.module.css'


const Grilla3 = () => {

    const [imagenes, setImagenes] = useState([])

    const handleAddImageShow = (cloudData) => {
        setImagenes((prevState) => {
            let newState = [...prevState, cloudData]
            return newState;
        })
    }

    return (
        <>
            <div className={styles.marco}>
                <img className={styles.marcoImg} src={img} alt="" />


                <div className={styles.contenedorImgs}>
                    {imagenes.map(imgData => <img className={styles.imagen} src={imgData.url} />)}
                </div>


            </div>

            <UploadWidget getImageData={handleAddImageShow} />

        </>
    );
}

export default Grilla3;