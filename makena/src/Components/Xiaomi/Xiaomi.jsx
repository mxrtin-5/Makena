import { useState } from 'react';
import styles from './Xiaomi.module.css'
import UploadWidget from '../UploadWidget/UploadWidget';



const Xiaomi = () => {



    const [imgData, setImgData] = useState("")

    console.log(imgData)

    return (
        <section className={styles.container}>

            <div className={styles.marco}>


                <img className={styles.imagen} src={imgData.url} alt="Imagen" />

                <img className={styles.camera} src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693412641/luvxwinehklyxbnojwou.png" alt="" />
                
            </div>
            <UploadWidget getImageData={setImgData} />
        </section>
    );
}

export default Xiaomi;

// JSON.stringify({
//     backgroundColor: 'blue'
// })

// const estilos = JSON.parse()
