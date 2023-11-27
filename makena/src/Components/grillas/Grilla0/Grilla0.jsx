import { useContext, useRef, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla0.module.css'
import { GrillasContext } from "../../../context/grillasContext";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { CartContext } from "../../../context/cartContext";
import EditableImage from "../../EditableImage/EditableImage";
import ImageProvider from "../../../context/imageContext";
import CheckoutPayment from "../../CheckoutComponents/CheckoutPayment/CheckoutPayment";
import { FaBasketShopping } from "react-icons/fa6";



const Grilla0 = ({ phoneImg }) => {

    const { id } = useParams()

    const { setHeight, setEscala, escala, setTranslateX, translateX, setTranslateY, translateY, width, height, setWidth, cropperRef, croppedImage, handleCrop } = useContext(GrillasContext);

    const { agregarAlCarrito, counter } = useContext(CartContext)

    const [imagenes, setImagenes] = useState([]);

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const [isPopupOpen, setPopupOpen] = useState(false);

    // const [combinedImageUrl, setCombinedImageUrl] = useState('');

    const [orderInfo, setOrderInfo] = useState({
        modelo: id,
        url: [],
        precio: 0,
        cantidad: counter,
    });

    const combinedImageRef = useRef(null);

    const obtenerPrecio = async () => {

        const celularesRef = doc(db, "celulares", id);

        const docRef = getDoc(celularesRef, id);
        docRef.then((documento) => {
            const price = documento.data().price;

            const product = {
                name: id,
                img: imagenes,
                price: price,
                counter: counter,
            };

            setOrderInfo((prevData) => ({
                ...prevData,
                url: imagenes,
                escala,
                translateX,
                translateY,
                precio: price,
            }));

            if (documento.exists()) {
                agregarAlCarrito(product);
                return price;
            } else {
                throw new Error("Me quiero morir");
            }
        })
    };



    //Toggle borde
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

    return (
        <div className={styles.divContainer}>
            <ImageProvider>
                <div className={styles.marco}>
                    {/* <Cropper
                        initialAspectRatio={16 / 9}
                        guides={false}
                        crop={handleCrop}
                        ref={cropperRef}
                    /> */}
                    <img
                        onLoad={(e) => {
                            setWidth(e.target.width);
                            setHeight(e.target.height);
                        }}
                        className={styles.marcoImg}
                        src={phoneImg}
                        style={{
                            zIndex: isPopupOpen ? -1000 : 10000
                        }}
                        alt=""
                    />

                    <div className={styles.contenedorImgs}>
                        {imagenes.map((imgData, index) => (
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
                                translateX={translateX}
                                translateY={translateY}
                                className={isImageSelected(index) ? styles.selectedImage : ''}
                            />
                        ))}
                    </div>
                </div>

                <canvas
                    ref={combinedImageRef}
                    style={{ display: 'none' }}
                    width={width}
                    height={height}
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
                                    setTranslateY(prev => {
                                        const newValue = prev[imagenSeleccionada] - 5
                                        const newState = changeValueArray(prev, imagenSeleccionada, newValue)

                                        return newState
                                    });
                                }
                            }}
                        >
                            Arriba
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => {
                                if (isImageSelected(imagenSeleccionada)) {
                                    setTranslateY(prev => {
                                        const newValue = prev[imagenSeleccionada] + 5
                                        const newState = changeValueArray(prev, imagenSeleccionada, newValue)
                                        return newState
                                    });
                                }
                            }}
                        >
                            Abajo
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => {
                                if (isImageSelected(imagenSeleccionada)) {
                                    setTranslateX(prev => {
                                        const newValue = prev[imagenSeleccionada] + 5
                                        const newState = changeValueArray(prev, imagenSeleccionada, newValue)

                                        return newState
                                    });
                                }
                            }}
                        >
                            {"=>"}
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => {
                                if (isImageSelected(imagenSeleccionada)) {
                                    setTranslateX(prev => {
                                        const newValue = prev[imagenSeleccionada] - 5
                                        const newState = changeValueArray(prev, imagenSeleccionada, newValue)

                                        return newState
                                    });
                                }
                            }}
                        >
                            {"<="}
                        </button>
                    </div>
                </div>

                <div className={styles.containerBotones}>
                    <button className={styles.btn} onClick={TogglePopup}>Toggle</button>
                    <button className={styles.btn} onClick={() => obtenerPrecio(id)}><FaBasketShopping /></button>
                </div>

                
                <div className={styles.containerUpload}>
                    <UploadWidget getImageData={handleAddImageShow} />
                </div>

                <div style={{ display: "none" }}>
                    {orderInfo.url && (
                        <CheckoutPayment orderData={orderInfo} />
                    )}
                </div>

                {/* {croppedImage && (
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
                )} */}
            </ImageProvider>
        </div>

    );
};

export default Grilla0;
