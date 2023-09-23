import { useContext, useEffect, useRef, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla1.module.css'
import ImageProvider from "../../../context/imageContext";
import EditableImage from "../../EditableImage/EditableImage";
import { GrillasContext } from "../../../context/grillasContext";
import { Cropper } from "react-cropper";

const changeValueArray = (arr, indexForChange, newValue) => {
    const newArray = arr.map((element, index) => {
        if (index === indexForChange) return newValue;
        return element
    })

    return newArray
}
const Grilla1 = ({ phoneImg }) => {

    const { setHeight, setWidth, handleCrop, guardarDatos, croppedImage } = useContext(GrillasContext);

    const [imagenes, setImagenes] = useState([]);

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const [isPopupOpen, setPopupOpen] = useState(false);

    const [escalas, setEscalas] = useState([1,1])

    const [translateX, setTranslateX] = useState(0);

    const [translateY, setTranslateY] = useState(0);

    const cropperRef = useRef(null);

    const TogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleAddImageShow = (cloudData) => {
        setImagenes((prevState) => {
            let newState = [...prevState, cloudData];
            setImagenSeleccionada(newState.length - 1);
            return newState;
        });
    };

    const handleDrop = (fromIndex, toIndex) => {
        const updatedImages = [...imagenes];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
        setImagenes(updatedImages);
    };

    const handleImageClick = (index) => {
        setImagenSeleccionada(index);
    };

    const isImageSelected = (index) => {
        return index === imagenSeleccionada;
    };

    return (
        <ImageProvider>
            <div className={styles.marco}>
                {/* {imagenes && imagenes.length > 0 && (
                    <Cropper
                        ref={cropperRef}
                        //escala
                        className={styles.cropperCropBox}
                        src={imagenes[0].url}
                        guides={false}
                        dragMode="none"
                        responsive={true}
                        autoCropArea={1}
                        zoomTo={escalas[imagenSeleccionada]} //!No olvidar de corregir esto
                        cropBoxResizable={false}
                        zoomable={false}
                        zoomOnTouch={false}
                        wheelZoomRatio={0}
                        cropBoxMovable={false}
                    />
                )} */}
                {imagenes && imagenes.length > 0 && (
                    escalas.map(escalaValue => <Cropper
                        ref={cropperRef}
                        className={styles.cropperCropBox}
                        src={imagenes[0].url}
                        guides={false}
                        dragMode="none"
                        responsive={true}
                        autoCropArea={1}
                        zoomTo={escalaValue} 
                        cropBoxResizable={false}
                        zoomable={false}
                        zoomOnTouch={false}
                        wheelZoomRatio={0}
                        cropBoxMovable={false}
                    />)
                )}
                <img
                    onLoad={(e) => {
                        setWidth(e.target.width);
                        setHeight(e.target.height);
                    }}
                    className={styles.marcoImg}
                    src={phoneImg}
                    style={{
                        zIndex: isPopupOpen ? 100000000 : -10000
                    }}
                    alt=""
                />
 {/* //!    MODULARIZADO */}
                <div className={styles.contenedorImgs}>
                    {imagenes.map((imgData, index) => (
                        <EditableImage
                            key={imgData.url}
                            src={imgData.url}
                            index={index}
                            onDrop={handleDrop}
                            onClick={() => handleImageClick(index)}
                            isSelected={isImageSelected(index)}
                            escala={escalas[index]}
                            translateX={imagenSeleccionada === index ? translateX : 0}
                            translateY={imagenSeleccionada === index ? translateY : 0}
                            className={isImageSelected(index) ? styles.selectedImage : ''}
                            style={
                                isImageSelected(index)
                                    ? {
                                        transform: `translate(${translateX}px, ${translateY}px) scale(${escalas[index]})`,
                                    }
                                    : {}
                            }
                        />
                    ))}
                </div>
 {/* //!    MODULARIZADO */}

            </div>

            <div className={styles.containerEditar}>
                <div className={styles.container}>
{/* //! 1 SOLO CUSTOM BUTTON QUE RECIBA LO QUE NECESITA PARA FUNCIONAR */}
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (isImageSelected(imagenSeleccionada)) {

                                setEscalas((estadoPrevio) => {

                                    const newValue = estadoPrevio[imagenSeleccionada] + 0.3

                                    const newState = changeValueArray(estadoPrevio, imagenSeleccionada, newValue)
                                    console.log(newState, "sacacorcho");
                                    
                                    return newState

                                })

                            }
                        }}
                    >
                        Zoom +
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (isImageSelected(imagenSeleccionada)) {
                                setEscalas((estadoPrevio) => {

                                    const newValue = estadoPrevio[imagenSeleccionada] - 0.3

                                    const newState = changeValueArray(estadoPrevio, imagenSeleccionada, newValue)
                                    
                                    console.log(newState, "sacacorcho");
                                    return newState

                                })
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
                            if (isImageSelected(imagenSeleccionada)) {
                                setTranslateY(translateY - 5);
                            }
                        }}
                    >
                        Arriba
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (isImageSelected(imagenSeleccionada)) {
                                setTranslateY(translateY + 5);
                            }
                        }}
                    >
                        Abajo
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (isImageSelected(imagenSeleccionada)) {
                                setTranslateX(translateX + 5);
                            }
                        }}
                    >
                        {"=>"}
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (isImageSelected(imagenSeleccionada)) {
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
                <button onClick={handleCrop}>Recortar</button>
                <button onClick={TogglePopup}>toggle</button>
                <button
                    style={{
                        marginTop: "80px",
                    }}
                    onClick={guardarDatos}
                >
                    Realizar pedido
                </button>
            </div>

            {croppedImage && (
                <div>
                    <img
                        style={{
                            display: "none",
                            transform: `translate(${translateX}px, ${translateY}px)`,
                        }}
                        src={croppedImage}
                        alt="Imagen recortada"
                    />
                </div>
            )}
        </ImageProvider>
    );
};

export default Grilla1;



