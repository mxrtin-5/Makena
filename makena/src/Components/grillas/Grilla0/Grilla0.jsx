import { useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla0.module.css'


const Grilla0 = ({ phoneImg }) => {


    const [imgData, setImgData] = useState("");


    return (
        <>
            <div className={styles.marco}>
                <img className={styles.marcoImg} src={phoneImg} alt="" />
                <img className={styles.imagen} src={imgData.url} />


            </div>

            <UploadWidget getImageData={setImgData} />

        </>
    );
}

export default Grilla0;