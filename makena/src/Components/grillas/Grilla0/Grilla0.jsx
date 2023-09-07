import { useEffect, useState } from "react";
import UploadWidget from "../../UploadWidget/UploadWidget";
import styles from './Grilla0.module.css'
import { fabric } from 'fabric'


const Grilla0 = ({ phoneImg }) => {

    const [imgData, setImgData] = useState("");

    console.log(imgData);

    const [isPopupOpen, setPopupOpen] = useState(false)

    const TogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    }

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
                <img className={styles.marcoImg} src={phoneImg} alt="" />
                <img className={isPopupOpen ? styles.imagen : styles.imagenConBorde} src={imgData && imgData.url} />



            </div>

            <UploadWidget getImageData={setImgData} />

            
            <button className={styles.button2} onClick={TogglePopup}>Editar posiciones</button>

        </>
    );
}

export default Grilla0;