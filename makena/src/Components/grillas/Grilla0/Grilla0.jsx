import { useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla0.module.css'
import img from '/prueba-removebg-previesssssw.png'


const Grilla0 = () => {

    const [imgData, setImgData] = useState("")

    return (
        <>
            <div className={styles.marco}>
                <img className={styles.marcoImg} src={img} alt="" />
                <img className={styles.imagen} src={imgData.url} />

            </div>
            <UploadWidget getImageData={setImgData} />
        </>
    );
}

export default Grilla0;