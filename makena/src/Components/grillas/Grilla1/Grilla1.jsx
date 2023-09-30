import { useContext, useRef, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla1.module.css'
import ImageProvider from "../../../context/imageContext";
import EditableImage from "../../EditableImage/EditableImage";
import { GrillasContext } from "../../../context/grillasContext";
import { Cropper } from "react-cropper";
import html2canvas from 'html2canvas'


const Grilla1 = ({ phoneImg }) => {

    const { setHeight, setWidth, handleCrop, guardarDatos, croppedImage, cropperRef } = useContext(GrillasContext);

    const [imagenes, setImagenes] = useState([]);

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const [isPopupOpen, setPopupOpen] = useState(false);

    const [escala, setEscala] = useState([1, 1])

    const [translateX, setTranslateX] = useState(0);

    const [translateY, setTranslateY] = useState(0);

    const [combinedImageUrl, setCombinedImageUrl] = useState('');

    const combinedImageRef = useRef(null);

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

    const changeValueArray = (arr, indexForChange, newValue) => {
        const newArray = arr.map((element, index) => {
            if (index === indexForChange) return newValue;
            return element
        })

        return newArray
    }

    const combineImages = () => {
        // Crear un array de promesas para cargar las imágenes de Cloudinary
        const imagePromises = imagenes.map((imgData) => {
            return new Promise((resolve) => {
                const imgElement = new Image();
                imgElement.crossOrigin = "anonymous"; // Habilitar el uso de CORS
                imgElement.src = imgData.url;
                imgElement.onload = () => {
                    resolve(imgElement);
                };
            });
        });

        const applyZoom = (imgElement, zoom) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = imgElement.width * zoom;
            canvas.height = imgElement.height * zoom;
            ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
            return canvas;
        };

        // Aplicar zoom a las imágenes según la escala
        const zoomedImages = imagenes.map((imgElement, index) => {
            const zoom = escala[index] || 1; // Obtener la escala correspondiente o 1 si no hay escala
            return applyZoom(imgElement, zoom);
        });

        // Calcular el ancho y alto total de las imágenes combinadas
        const totalWidth = zoomedImages.reduce((width, imgElement) => {
            return Math.max(width, imgElement.width);
        }, 0);
        const totalHeight = zoomedImages.reduce((height, imgElement) => {
            return height + imgElement.height;
        }, 0);

        // Establecer las dimensiones del lienzo combinado
        combinedCanvas.width = totalWidth;
        combinedCanvas.height = totalHeight;

        // Dibujar las imágenes una encima de la otra en el lienzo
        let offsetY = 0;

        zoomedImages.forEach((imgElement) => {
            const x = (combinedCanvas.width - imgElement.width) / 2; // Centrar horizontalmente
            const y = offsetY; // Apilar verticalmente
            ctx.drawImage(imgElement, x, y, imgElement.width, imgElement.height);
            offsetY += imgElement.height;
        });

        const combinedImageUrl = combinedCanvas.toDataURL("image/png")

        setCombinedImageUrl(combinedImageUrl);

        console.log(combinedImageUrl);
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
                        zoomTo={escala[imagenSeleccionada]}
                        cropBoxResizable={false}
                        zoomable={false}
                        zoomOnTouch={false}
                        wheelZoomRatio={0}
                        cropBoxMovable={false}
                    />
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

                <div className={styles.contenedorImgs}>
                    {imagenes.map((imgData, index) => (
                        <EditableImage
                            key={imgData.url}
                            src={imgData.url}
                            index={index}
                            referenciaImagenes={index}
                            onDrop={handleDrop}
                            onClick={() => handleImageClick(index)}
                            isSelected={isImageSelected(index)}
                            escala={escala[index]}
                            translateX={imagenSeleccionada === index ? translateX : 0}
                            translateY={imagenSeleccionada === index ? translateY : 0}
                            className={isImageSelected(index) ? styles.selectedImage : ''}
                            style={
                                isImageSelected(index)
                                    ? {
                                        transform: `translate(${translateX}px, ${translateY}px) scale(${escala})`,
                                    }
                                    : {}
                            }
                        />
                    ))}
                </div>
            </div>

            <canvas
                ref={combinedImageRef}
                style={{ display: 'none' }}
                width="240" // Ajusta el ancho del lienzo según tus necesidades
                height="500" // Ajusta la altura del lienzo según tus necesidades
            ></canvas>

            {/* <img src={combinedImageUrl} alt="Combined Image" /> */}

            <div className={styles.containerEditar}>
                <div className={styles.container}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            if (isImageSelected(imagenSeleccionada)) {

                                setEscala((estadoPrevio) => {

                                    const newValue = estadoPrevio[imagenSeleccionada] + 0.3

                                    const newState = changeValueArray(estadoPrevio, imagenSeleccionada, newValue)

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
                                setEscala((estadoPrevio) => {

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
                <button onClick={() => {
                    console.log("Button clicked");
                    handleCrop();
                }}>Recortar</button>
                <button onClick={TogglePopup}>toggle</button>
                <button
                    style={{
                        marginTop: "80px",
                    }}
                    onClick={guardarDatos}
                >
                    Realizar pedido
                </button>
                <button onClick={combineImages}> Unir</button>
            </div>

            {croppedImage && (
                <div>
                    <img
                        style={{
                            display: "none",
                            transform: `translate(${translateX[imagenSeleccionada]}px, ${translateY[imagenSeleccionada]
                                }px)`,
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