import { useContext, useRef, useCallback, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla1.module.css'
import ImageProvider from "../../../context/imageContext";
import EditableImage from "../../EditableImage/EditableImage";
import { GrillasContext } from "../../../context/grillasContext";
import { Cropper } from "react-cropper";
import html2canvas from 'html2canvas'
import { db } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { CartContext } from "../../../context/cartContext";


const Grilla1 = ({ phoneImg, id }) => {

    const { setHeight, setWidth, croppedImage, cropperRef } = useContext(GrillasContext);

    const { agregarAlCarrito } = useContext(CartContext);

    const [imagenes, setImagenes] = useState([]);

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const [isPopupOpen, setPopupOpen] = useState(false);

    const [escala, setEscala] = useState([1, 1])

    const [translateX, setTranslateX] = useState(0);

    const [translateY, setTranslateY] = useState(0);

    const [combinedImageUrl, setCombinedImageUrl] = useState('');

    const [loadedImages, setLoadedImages] = useState(null)

    const [pedidoRealizado, setPedidoRealizado] = useState(false);

    const ref = useRef(null);

    const handleAgregarAlCarrito = () => {
        const product = {
            name: id,
            img: combinedImageUrl,
            price: 0
        };
        agregarAlCarrito(product, id);
    };

    const guardarDatos = async () => {
        try {
            await addDoc(collection(db, "pedidos"), {
                croppedImage: combinedImageUrl,
                translateX: translateX,
                translateY: translateY
            });
            setPedidoRealizado(true);
            console.log("Datos guardados con éxito");
        } catch (error) {
            console.error("Error al guardar datos en Firebase:", error);
        }
    }

    const takeScreenshot = useCallback(() => {
        if (ref.current === null) {
            return;
        }
        html2canvas(ref.current, {
            allowTaint: true,
            useCORS: true,
            scale: 1,
            logging: true,
        }).then((canvas) => {
            const screenshotDataUrl = canvas.toDataURL('image/jpeg', 1);
            console.log("URL de la imagen generada:", screenshotDataUrl);
            return screenshotDataUrl; // Devuelve la URL de la imagen generada
        }).then((screenshotDataUrl) => {
            setCombinedImageUrl(screenshotDataUrl); // Actualiza combinedImageUrl después de la generación
            return screenshotDataUrl; // Devuelve la URL de la imagen generada
        }).catch((err) => {
            console.log("Error al generar la imagen:", err);
        })
    }, [ref]);


    const handleAllImagesLoaded = () => {
        setLoadedImages(loadedImages + 1);
        if (loadedImages === imagenes.length - 1) {
            takeScreenshot();
        }
    };

    console.log(combinedImageUrl);

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

    return (
        <ImageProvider>
            <div className={styles.marco} ref={ref}>
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
                            onImageLoad={handleAllImagesLoaded}
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
                <button onClick={TogglePopup}>Toggle</button>
                <button
                    style={{
                        marginTop: "80px",
                    }}
                    onClick={guardarDatos}
                    disabled={pedidoRealizado}
                >
                    {pedidoRealizado ? "Pedido realizado" : "Realizar pedido"}
                </button>
                <button
                    type="button"
                    onClick={handleAgregarAlCarrito}
                >
                    Agregar al carrito
                </button>
                <button type="button" onClick={takeScreenshot}> Unir</button>
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