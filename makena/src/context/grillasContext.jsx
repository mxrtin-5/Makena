import { createContext, useRef, useState } from "react";
import { db } from "../firebase/config"
import { addDoc, collection } from "firebase/firestore";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


export const GrillasContext = createContext()

const GrillasProvider = ({ children }) => {

    const [croppedImage, setCroppedImage] = useState();

    const [width, setWidth] = useState(0);

    const [height, setHeight] = useState(0);

    const [escala, setEscala] = useState([1, 1, 1, 1, 1, 1]);

    const [translateX, setTranslateX] = useState([0, 0, 0, 0, 0, 0]);

    const [translateY, setTranslateY] = useState([0, 0, 0, 0, 0, 0]);

    const cropperRef = useRef(null);

    const datos = {
        croppedImage: croppedImage,
        translateX: translateX,
        translateY: translateY
    }

    const guardarDatos = async () => {


        try {
            await addDoc(collection(db, "pedidos"), {
                ...datos
            })
        } catch {
            Toastify({
                text: "Error",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        }
    }

    const handleCrop = async () => {

        if (cropperRef.current && cropperRef.current.cropper) {
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
                width: width * escala,
                height: height * escala
            })

            if (croppedCanvas) {
                const context = croppedCanvas.getContext("2d");

                if (context) {
                    context.scale(escala, escala);
                    context.translate(-translateX, -translateY);

                    const croppedImageBase64 = croppedCanvas.toDataURL();
                    setCroppedImage(croppedImageBase64);
                }
            }
        }
    };



    return (
        <GrillasContext.Provider value={{
            guardarDatos,
            handleCrop,
            escala,
            setTranslateX,
            setTranslateY,
            translateX,
            translateY,
            width,
            height,
            croppedImage,
            cropperRef,
            setEscala,
            setWidth,
            setHeight
        }}>
            {children}
        </GrillasContext.Provider>
    );
}

export default GrillasProvider;