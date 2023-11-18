import { useContext, useRef, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla0.module.css'
import { GrillasContext } from "../../../context/grillasContext";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { CartContext } from "../../../context/cartContext";
import EditableImage from "../../EditableImage/EditableImage";
import ImageProvider from "../../../context/imageContext";
import CheckoutPayment from "../../CheckoutComponents/CheckoutPayment/CheckoutPayment";
import { FaBasketShopping } from "react-icons/fa6";



const Grilla0 = ({ phoneImg }) => {

    const { id } = useParams()

    console.log(id);

    const { width, height, croppedImage, cropperRef } = useContext(GrillasContext);

    const { agregarAlCarrito, counter } = useContext(CartContext)

    const [imgData, setImgData] = useState([]);

    const [isPopupOpen, setPopupOpen] = useState(false);

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const [escala, setEscala] = useState([1, 1])

    const [translateX, setTranslateX] = useState(0);

    const [translateY, setTranslateY] = useState(0);

    const [combinedImageUrl, setCombinedImageUrl] = useState('');

    const [orderInfo, setOrderInfo] = useState({
        modelo: id,
        url: '',
        price: 0,
        cantidad: counter,
    });

    const ref = useRef(null);

    const combinedImageRef = useRef(null);

    console.log("TranslateX: ", translateX);
    console.log("TranslateY: ", translateY);

    const TogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    }

    //DND
    const handleDrop = (fromIndex, toIndex) => {
        const updatedImages = [...imgData];
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

    const handleAddImageShow = (cloudData) => {
        setImgData((prevState) => {
            let newState = [cloudData, ...prevState];
            return newState;
        });
    };

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
                    price: price, // Set the correct price here
                    counter: counter,
                };

                setOrderInfo((prevData) => ({
                    ...prevData,
                    url: screenshotDataUrl,
                    price: price, // Set the correct price in orderInfo
                }));

                agregarAlCarrito(product);;
            } else {
                throw new Error("Me quiero morir");
            }
        } catch (error) {
            console.log("Error al generar la imagen:", error);
        }
    };

    console.log(orderInfo);

    return (

        <ImageProvider>
            <div className={styles.divContainer}>
                <div className={styles.marco} ref={ref}>
                    <img
                        style={{
                            zIndex: isPopupOpen ? -1000 : 1000
                        }}
                        className={styles.marcoImg}
                        src={phoneImg}
                        alt=""
                    />

                    <div className={styles.contenedorImgs}>
                        {imgData.map((imgData, index) => (
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

                <div className={styles.containerBotones}>
                    <div className={styles.containerUpload}>
                        <UploadWidget getImageData={handleAddImageShow} />
                    </div>
                    <button className={styles.btn} onClick={TogglePopup}>Toggle</button>
                    <button className={styles.btn} onClick={() => obtenerPrecio(id)}><FaBasketShopping /></button>
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
            </div>
        </ImageProvider>


    );
}

export default Grilla0;