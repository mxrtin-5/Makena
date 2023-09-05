import { useContext, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import img from '/prueba-removebg-previesssssw.png'
import styles from './Grilla1.module.css'
import ImageProvider, { ImageContext } from "../../../context/imageContext";
import EditableImage from "../../EditableImage/EditableImage";


const Grilla1 = () => {

    const [imagenes, setImagenes] = useState([])


    const handleAddImageShow = (cloudData) => {
        setImagenes((prevState) => {
            let newState = [...prevState, cloudData]
            return newState;
        })
    }

    const moveImage = (fromIndex, toIndex) => {
        const updatedImages = [...imagenes];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
        setImagenes(updatedImages);
    };


    return (
        <ImageProvider>
            <div className={styles.marco}>
                <img className={styles.marcoImg} src={img} alt="" />

                <div className={styles.contenedorImgs}>
                    {imagenes.map((imgData, index) => (
                        <EditableImage
                            imagen={styles.imagen}
                            key={imgData.url}
                            src={imgData.url}
                            index={index}
                            moveImage={moveImage}
                        />
                    ))}
                </div>
            </div>

            <UploadWidget getImageData={handleAddImageShow} />
        </ImageProvider>


    );
}

export default Grilla1;