import { useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import img from '../../../../public/prueba-removebg-previesssssw.png'
import styles from './Grilla1.module.css'


const Grilla1 = () => {
    // const [imgData, setImgData] = useState("")
    const [imagenes, setImagenes] = useState([])
    const handleAddImageShow = (cloudData) => {
        setImagenes((prevState) => {
            let newState = [...prevState, cloudData]
            return newState;
        })
    }

    console.log(imagenes);
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

export default Grilla1;