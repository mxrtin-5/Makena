import { useContext, useRef, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla4.module.css'
import ImageProvider from "../../../context/imageContext";
import EditableImage from "../../EditableImage/EditableImage";
import { Cropper } from "react-cropper";
import { useParams } from "react-router-dom";
import { GrillasContext } from "../../../context/grillasContext";
import { CartContext } from "../../../context/cartContext";
import html2canvas from "html2canvas";
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";


const Grilla4 = ({ phoneImg }) => {

    const { id } = useParams()

    const [imagenes, setImagenes] = useState([]);

    const [isPopupOpen, setPopupOpen] = useState(false);

    const { setHeight, width, height, setWidth, croppedImage, cropperRef } = useContext(GrillasContext);

    const { agregarAlCarrito, counter } = useContext(CartContext)

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const [escala, setEscala] = useState([1, 1])

    const [translateX, setTranslateX] = useState(0);

    const [translateY, setTranslateY] = useState(0);

    const [combinedImageUrl, setCombinedImageUrl] = useState('');

    const [orderInfo, setOrderInfo] = useState({
        modelo: id,
        url: '',
        precio: 0,
        cantidad: counter,
    });

    const ref = useRef(null);

    const combinedImageRef = useRef(null)

    const handleAddImageShow = (cloudData) => {
        setImagenes((prevState) => {
            let newState = [cloudData, ...prevState];
            return newState;
        });
    };

    //DND
    const handleDrop = (fromIndex, toIndex) => {
        const updatedImages = [...imagenes];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
        setImagenes(updatedImages);
    };
    //Click img
    const handleImageClick = (index) => {
        setImagenSeleccionada(index);
    };
    //Condicion de imagen seleccionada
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

    const TogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    }

    const obtenerPrecio = async (ProductID) => {
        if (ref.current === null) {
            return;
        }

        try {
            const canvas = await html2canvas(ref.current, {
                allowTaint: true,
                useCORS: true,
                scale: 1,
                logging: true,
            });

            const screenshotDataUrl = canvas.toDataURL('image/png', 1);
            console.log("URL de la imagen generada:", screenshotDataUrl);

            setCombinedImageUrl(screenshotDataUrl);

            const docRef = doc(db, "celulares", ProductID);
            const documento = await getDoc(docRef);

            if (documento.exists()) {
                const price = documento.data().price;

                const product = {
                    name: id,
                    img: screenshotDataUrl,
                    price: price,
                    counter: counter,
                };

                setOrderInfo((prevData) => ({
                    ...prevData,
                    url: screenshotDataUrl,
                    precio: price,
                }));

                agregarAlCarrito(product);

                // Resto de la lógica de manejo del precio y carrito
            } else {
                throw new Error("Me quiero morir");
            }
        } catch (error) {
            console.log("Error al generar la imagen:", error);
        }
    };

    console.log(combinedImageUrl);


    return (
        <ImageProvider>
            <>
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
                            style={{ width: 600, height: 1200 }}
                        />
                    )}

                    <img onLoad={(e) => {
                        setWidth(e.target.width);
                        setHeight(e.target.height);
                    }}
                        className={styles.marcoImg}
                        style={{
                            zIndex: isPopupOpen ? 100000000 : -10000
                        }}
                        src={phoneImg} alt="" />

                    <div className={styles.contenedorImgs}>
                        <div className={isPopupOpen ? styles.imagen : styles.imagenConBorde}>
                            {imagenes.length > 0 && <img src={imagenes[0].url} className={styles.imagen1} />}
                        </div>

                        <div className={styles.parteAbajo}>
                            {imagenes.slice(1).map((imgData, index) => (
                                <EditableImage
                                    imagen={isPopupOpen ? styles.imagen : styles.imagenConBorde}
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
                        width={width} // Utilizamos la variable setWidth aquí
                        height={height} // Utilizamos la variable setHeight aquí
                    ></canvas>

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

                </div>

                <div className={styles.containerBotones}>
                    <UploadWidget getImageData={handleAddImageShow} />
                    <button onClick={TogglePopup}>Toggle</button>
                    <button onClick={() => obtenerPrecio(id)}>Agregar al carrito</button>
                </div>

                <div style={{ display: "none" }}>
                    {orderInfo.url && (
                        <CheckoutPayment orderData={orderInfo} />
                    )}
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

            </>
        </ImageProvider>

    );
}

export default Grilla4;