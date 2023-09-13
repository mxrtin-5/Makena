import { createContext, useRef, useState } from "react";
import { db } from "../firebase/config"
import { addDoc, collection } from "firebase/firestore";



export const GrillasContext = createContext()

const GrillasProvider = ( {children} ) => {

    const [translateX, setTranslateX] = useState(0);

    const [translateY, setTranslateY] = useState(0);

    const [croppedImage, setCroppedImage] = useState(null);

    const [width, setWidth] = useState(0);

    const [height, setHeight] = useState(0);

    const [escala, setEscala] = useState(1);

    const cropperRef = useRef(null);

    const datos = {
        croppedImage: croppedImage,
        translateX: translateX,
        translateY: translateY
    }

    const guardarDatos = async (e) => {

        e.preventDefault();

        try {
            await addDoc(collection(db, "pedidos"), {
                ...datos
            })
        } catch {
            console.log("error");
        }
    }

    const handleCrop = async (e) => {

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
            escala,
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