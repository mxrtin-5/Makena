import { useEffect, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla0.module.css'
import { fabric } from 'fabric'


const Grilla0 = ({ phoneImg }) => {

    const [imgData, setImgData] = useState("");

    const [escala, setEscala] = useState(1)

    const [translateX, setTranslateX] = useState(0)

    const [translateY, setTranslateY] = useState(0)

    const [zIndex, setZIndex] = useState(true)

    console.log(imgData);

    const initCanvas = (id) => {
        return new fabric.Canvas(id, {
            width: 240,
            height: 500,
        });
    };

    const setBackground = (url, canvas) => {
        fabric.Image.fromURL(url, (img) => {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
    };

    const canvas = initCanvas("canvas");

    canvas.on("mouse:move", (event) => {
        const myEvent = event.e;
        const delta = new fabric.Point(myEvent.movementX, myEvent.movementY);
        canvas.relativePan(delta);
    });

    // Mueve la llamada a setBackground dentro de un useEffect para manejar cambios en imgData
    useEffect(() => {
        if (imgData && typeof imgData === "string") {
            setBackground(imgData, canvas);
        }
    }, [imgData, canvas]);


    return (
        <>
            <div className={styles.marco}>
                <img style={{
                    zIndex: zIndex && 1000
                }} className={styles.marcoImg} src={phoneImg} alt="" />
                <img style={{
                    transform: `scale(${escala}) translate(${translateX}px, ${translateY}px)`
                }} className={ styles.imagen} src={imgData && imgData.url} />
            </div>

            <UploadWidget getImageData={setImgData} />

            <div className={styles.containerEditar}>
                <div className={styles.container}>
                    <button className={styles.button} onClick={() => setEscala(escala + 0.1)}>Zoom +</button>
                    <button className={styles.button} onClick={() => setEscala(escala - 0.1)}>Zoom -</button>
                </div>

                <div className={styles.container}>
                    <button className={styles.button} onClick={() => setTranslateX(translateX + 3)}>{"<="}</button>
                    <button className={styles.button} onClick={() => setTranslateX(translateX - 3)}>{"=>"}</button>
                </div>

                <div className={styles.container}>
                    <button className={styles.button} onClick={() => setTranslateY(translateY + 3)}>{"Arriba"}</button>
                    <button className={styles.button} onClick={() => setTranslateY(translateY - 3)}>{"Abajo"}</button>
                </div>

            </div>


            <button className={styles.button2} onClick={() => setZIndex(!zIndex)}>Ocultar</button>
        </>
    );
}

export default Grilla0;