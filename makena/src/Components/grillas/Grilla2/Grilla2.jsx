import styles from './Grilla2.module.css'
import { useContext, useRef, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import EditableImage from '../../EditableImage/EditableImage';
import ImageProvider from '../../../context/imageContext';
import html2canvas from 'html2canvas';
import { CartContext } from '../../../context/cartContext';
import { GrillasContext } from '../../../context/grillasContext';
import { db } from '../../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import CheckoutPayment from '../../CheckoutComponents/CheckoutPayment/CheckoutPayment';
import { FaBasketShopping } from "react-icons/fa6";



const Grilla2 = ({ phoneImg }) => {

    const { id } = useParams()

    const [imagenes, setImagenes] = useState([]);

    const [isPopupOpen, setPopupOpen] = useState(false);

    const { setHeight, width, height, setWidth, croppedImage, cropperRef } = useContext(GrillasContext);

    const { agregarAlCarrito, counter } = useContext(CartContext)

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const [escala, setEscala] = useState([1, 1])

    const [translateX, setTranslateX] = useState(0);

    const [translateY, setTranslateY] = useState(0);

    // const [combinedImageUrl, setCombinedImageUrl] = useState('');

    const [orderInfo, setOrderInfo] = useState({
        modelo: id,
        url: '',
        precio: 0,
        cantidad: counter,
    });

    const ref = useRef(null);

    const combinedImageRef = useRef(null);

    const TogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleAddImageShow = (cloudData) => {
        setImagenes((prevState) => {
            let newState = [...prevState, cloudData];
            return newState;
        });
    };

    console.log(imagenes);

    //DND
    const handleDrop = (fromIndex, toIndex) => {
        const updatedImages = [...imagenes];
        console.log("handleDrop called with fromIndex:", fromIndex, "toIndex:", toIndex);
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
        setImagenes(updatedImages);
    };
    //Click img
    const handleImageClick = (index) => {
        console.log("Imagen seleccionada:", index);
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

    const obtenerPrecio = async () => {
        if (ref.current === null) {
            return;
        }

        const celularesRef = doc(db, "celulares", id);

        const docRef = getDoc(celularesRef, id);
        docRef.then((documento) => {
            const price = documento.data().price;
            console.log(documento);

            const product = {
                name: id,
                img: imagenes,
                price: price,
                counter: counter,
            };

            setOrderInfo((prevData) => ({
                ...prevData,
                url: imagenes,
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

    return (

        <div className={styles.divPadre}>
            <ImageProvider>
                <div className={styles.marco} ref={ref}>
                    <img onLoad={(e) => {
                        setWidth(e.target.width);
                        setHeight(e.target.height);
                    }}
                        className={styles.marcoImg}
                        style={{
                            zIndex: isPopupOpen ? 1000 : -10000
                        }}
                        src={phoneImg} alt="" />

                    <div className={styles.contenedorImgs}>
                        {imagenes.map((imgData, index) => (
                            <EditableImage
                                key={index.url} // Asegúrate de que la clave sea única
                                imagen={isPopupOpen ? styles.imagen : styles.imagenConBorde}
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
                                            transform: `translate(${translateX}px, ${translateY}px) scale(${escala[index]})`,
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


            </ImageProvider>
        </div>

    );
};

export default Grilla2;


// const obtenerPrecio = async (ProductID) => {
//     if (ref.current === null) {
//         return;
//     }

//     try {
//         const canvas = await html2canvas(ref.current, {
//             allowTaint: true,
//             useCORS: true,
//             scale: 1,
//             logging: true,
//         });

//         const screenshotDataUrl = canvas.toDataURL('image/png', 1);
//         console.log("URL de la imagen generada:", screenshotDataUrl);

//         setCombinedImageUrl(screenshotDataUrl);

//         const docRef = doc(db, "celulares", ProductID);
//         const documento = await getDoc(docRef);

//         if (documento.exists()) {
//             const price = documento.data().price;

//             const product = {
//                 name: id,
//                 img: screenshotDataUrl,
//                 price: price,
//                 counter: counter,
//             };

//             setOrderInfo((prevData) => ({
//                 ...prevData,
//                 url: screenshotDataUrl,
//                 precio: price,
//             }));

//             agregarAlCarrito(product);

//         } else {
//             throw new Error("Me quiero morir");
//         }
//     } catch (error) {
//         console.log("Error al generar la imagen:", error);
//     }
// };