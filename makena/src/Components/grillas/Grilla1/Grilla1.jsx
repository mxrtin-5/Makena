import { useContext, useRef, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla1.module.css'
import ImageProvider from "../../../context/imageContext";
import EditableImage from "../../EditableImage/EditableImage";
import { GrillasContext } from "../../../context/grillasContext";
import { Cropper } from "react-cropper";


const Grilla1 = ({ phoneImg }) => {

    const { translateX, setTranslateY, setTranslateX, translateY, setEscala, escala, setHeight, setWidth, handleCrop, guardarDatos, croppedImage } = useContext(GrillasContext)

    const [imagenes, setImagenes] = useState([])

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const [isPopupOpen, setPopupOpen] = useState(false)

    console.log(imagenes);

    const cropperRef = useRef(null);

    const TogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    }

    const handleAddImageShow = (cloudData) => {
        setImagenes((prevState) => {
            let newState = [...prevState, cloudData]
            setImagenSeleccionada(newState.length - 1)
            return newState;
        })
    }

    const handleDrop = (fromIndex, toIndex) => {
        const updatedImages = [...imagenes];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
        setImagenes(updatedImages);
    };

    console.log(imagenSeleccionada);

    const handleImageClick = () => {
        setImagenSeleccionada(imagenSeleccionada === 0 ? 1 : 0);
    };

    const isImageSelected = () => {
        return imagenSeleccionada === 1;
    };


    return (
        <ImageProvider>
            <div className={styles.marco}>
                {imagenes && imagenes.length > 0 && (
                    <Cropper
                        ref={cropperRef}
                        className={styles.cropperCropBox}
                        src={imagenes[0].url}
                        guides={false}
                        dragMode="none"
                        responsive={true}
                        autoCropArea={1}
                        cropBoxResizable={false}
                        zoomable={false}
                        zoomOnTouch={false}
                        wheelZoomRatio={0}
                        cropBoxMovable={false}
                    />
                )}
                <img onLoad={(e) => {
                    setWidth(e.target.width);
                    setHeight(e.target.height);
                }} className={styles.marcoImg} src={phoneImg} alt="" />

                <div className={styles.contenedorImgs}>
                    {imagenes.map((imgData, index) => (
                        <EditableImage
                            key={imgData.url}
                            src={imgData.url}
                            index={index}
                            onDrop={handleDrop}
                            onClick={handleImageClick}
                            isSelected={imagenSeleccionada === index}
                            className={isImageSelected ? styles.selectedImage : ''}
                            style={
                                imagenSeleccionada === index
                                    ? {
                                        transform: `translate(${translateX}px, ${translateY}px) scale(${escala})`,
                                    }
                                    : {}
                            }
                        />
                    ))}
                </div>
            </div>

            <div className={styles.containerEditar}>
                <div className={styles.container}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (imagenSeleccionada === 1) {
                                setEscala(escala + 0.3)
                            }
                        }}
                    >
                        Zoom +
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (imagenSeleccionada === 1) {
                                setEscala(escala - 0.3)
                            }
                        }}
                    >
                        Zoom -
                    </button>
                </div>

                <div className={styles.container}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (imagenSeleccionada === 1) {
                                setTranslateY(translateY - 5);
                            }
                        }}
                    >
                        Arriba
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (imagenSeleccionada === 1) {
                                setTranslateY(translateY + 5);
                            }
                        }}
                    >
                        Abajo
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (imagenSeleccionada === 1) {
                                setTranslateX(translateX + 5);
                            }
                        }}
                    >
                        {"=>"}
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (imagenSeleccionada === 1) {
                                setTranslateX(translateX - 5);
                            }
                        }}
                    >
                        {"<="}
                    </button>
                </div>
            </div>

            <div className={styles.containerBotones}>
                <UploadWidget getImageData={handleAddImageShow} />
                <button onClick={handleCrop}>
                    Recortar
                </button>
                <button onClick={TogglePopup}>toggle</button>
                <button style={{
                    marginTop: "80px"
                }} onClick={guardarDatos}>
                    Realizar pedido
                </button>
            </div>

            {croppedImage && (
                <div>
                    <img style={{
                        display: "none",
                        transform: ` translate(${translateX}px, ${translateY}px)`
                    }} src={croppedImage} alt="Imagen recortada" />
                </div>
            )}
        </ImageProvider>
    );
}

export default Grilla1;