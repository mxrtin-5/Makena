import styles from './Grilla2.module.css'
import { useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import EditableImage from '../../EditableImage/EditableImage';
import ImageProvider from '../../../context/imageContext';

const Grilla2 = ({ phoneImg }) => {

    const [imagenes, setImagenes] = useState([])

    const [isPopupOpen, setPopupOpen] = useState(false)

    const TogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    }

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
            <>
                <div className={styles.marco}>
                    <img className={styles.marcoImg} src={phoneImg} alt="" />


                    <div className={styles.contenedorImgs}>
                        {imagenes.map((imgData, index) => (
                            <EditableImage
                                imagen={isPopupOpen ? styles.imagen : styles.imagenConBorde}
                                key={imgData.url}
                                src={imgData.url}
                                index={index}
                                moveImage={moveImage}
                            />
                        ))}
                    </div>


                </div>

                <UploadWidget getImageData={handleAddImageShow} />
                <button className={styles.button2} onClick={TogglePopup}>Editar posiciones</button>
            </>
        </ImageProvider>

    );
}

export default Grilla2;