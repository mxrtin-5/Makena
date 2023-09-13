import { useContext, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla0.module.css'
import Cropper from "react-cropper";
import 'cropperjs/dist/cropper.css';
import { GrillasContext } from "../../../context/grillasContext";


const Grilla0 = ({ phoneImg }) => {

    const [imgData, setImgData] = useState(null);

    const {translateX, translateY, cropperRef, escala, setEscala, setHeight, setWidth, width, height, setTranslateY, setTranslateX, handleCrop, guardarDatos, croppedImage } = useContext(GrillasContext)

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