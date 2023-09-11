import { useRef, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla0.module.css'
import Cropper from "react-cropper";
import { db } from '../../../firebase/config'
import { addDoc, collection } from "firebase/firestore";
import 'cropperjs/dist/cropper.css';


const Grilla0 = ({ phoneImg }) => {

    const [imgData, setImgData] = useState(null);

    const [escala, setEscala] = useState(1);

    const [translateX, setTranslateX] = useState(0);

    const [translateY, setTranslateY] = useState(0);

    const [croppedImage, setCroppedImage] = useState(null);

    const [width, setWidth] = useState(0);

    const [height, setHeight] = useState(0);

    const cropperRef = useRef(null);

    const datos = {
        croppedImage: croppedImage,
        translateX: translateX,
        translateY: translateY
    }

    const guardarDatos = async(e) =>{
        e.preventDefault();

        try{
            await addDoc(collection(db, "pedidos"),{
                ...datos
            })
        } catch{
            console.log("error");
        }
        
    }

    const handleCrop = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
                width: width * escala,
                height: height * escala
            });

            const context = croppedCanvas.getContext("2d");

            context.scale(escala, escala);
            context.translate(-translateX, -translateY);

            const croppedImageBase64 = croppedCanvas.toDataURL();
            setCroppedImage(croppedImageBase64);
            console.log(croppedImage);
        }
    };
    console.log("TranslateX: ", translateX);
    console.log("TranslateY: ", translateY);

    return (
        <>
            <div className={styles.marco}>
                {imgData && (
                    <Cropper
                        ref={cropperRef}
                        src={imgData.url}

                        className={styles.croper}
                        style={{
                            transform: `scale(${escala}) translate(${translateX}px, ${translateY}px)`,
                        }}
                        aspectRatio={NaN}
                        guides={true}
                        viewMode={1}
                        dragMode="move"
                        autoCropArea={1}
                        cropBoxResizable={false}
                    />
                )}
                <img onLoad={(e) => {
                    setWidth(e.target.width);
                    setHeight(e.target.height);
                }} className={styles.marcoImg} src={phoneImg} alt="" />
            </div>

            <UploadWidget getImageData={setImgData} />

            <div className={styles.containerEditar}>
                <div className={styles.container}>
                    <button
                        className={styles.button}
                        onClick={() => setEscala(escala + 0.3)}
                    >
                        Zoom +
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => setEscala(escala - 0.3)}
                    >
                        Zoom -
                    </button>
                </div>

                <div className={styles.container}>
                    <button
                        className={styles.button}
                        onClick={() => setTranslateY(translateY - 5)}
                    >
                        Arriba
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => setTranslateY(translateY + 5)}
                    >
                        Abajo
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => setTranslateX(translateX + 5)}
                    >
                        {"=>"}
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => setTranslateX(translateX - 5)}
                    >
                        {"<="}
                    </button>
                </div>
            </div>

            <button className={styles.button2} onClick={handleCrop}>
                Recortar
            </button>

            <button style={{
                marginTop: "80px"
            }} className={styles.button2} onClick={guardarDatos}>
                Rrealizar pedido
            </button>

            {croppedImage && (
                <div>
                    <img style={{
                        display: "none",
                        transform: ` translate(${translateX}px, ${translateY}px)`
                    }} src={croppedImage} alt="Imagen recortada" />
                </div>
            )}
        </>
    );
}

export default Grilla0;