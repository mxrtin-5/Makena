import styles from './Detail.module.css'
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore'
import Grilla0 from '../../Components/grillas/Grilla0/Grilla0'
import Grilla2 from '../../Components/grillas/Grilla2/Grilla2';
import Grilla3 from '../../Components/grillas/Grilla3/Grilla3';
import Grilla4 from '../../Components/grillas/Grilla4/Grilla4';
import Grilla5 from '../../Components/grillas/Grilla5/Grilla5';
import Grilla1 from '../../Components/grillas/Grilla1/Grilla1';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config'

const Detail = () => {

    const { id } = useParams() //! despues mira como traer el detalle de firebase solo para este telefono

    const { modelo } = useParams()

    console.log(id);

    const [telefonoInfo, setTelefonoInfo] = useState({});

    console.log(telefonoInfo, "<<<----------");

    const idGrilla = location.search.split("=")[1]


    //! aqui vos vas a tener solamente el mnodelo que lo vamos a sacar de la query

    useEffect(() => {
        // Crea una referencia al documento en la colección "celulares" con el ID especificado
        const phoneRef = doc(db, "celulares", id)

        // Obtiene los datos del documento
        getDoc(phoneRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    // El documento existe, puedes acceder a sus datos
                    const phoneData = docSnap.data();
                    console.log("Datos del teléfono:", phoneData);
                    setTelefonoInfo(phoneData)
                } else {
                    console.log("El documento no existe.");
                }
            })
            .catch((error) => {
                console.error("Error al obtener el documento:", error);
            });

    }, [id]);


    const selectGrid = (idGrilla) => {
        switch (idGrilla) {
            case "0":
                return <Grilla0 phoneImg={telefonoInfo.modelo} id={id} />
            case "1":
                return <Grilla1 phoneImg={telefonoInfo.modelo} id={id} />
            case "2":
                return <Grilla2 phoneImg={telefonoInfo.modelo} id={id} />
            case "3":
                return <Grilla3 phoneImg={telefonoInfo.modelo} id={id} />
            case "4":
                return <Grilla4 phoneImg={telefonoInfo.modelo} id={id} />
            case "5":
                return <Grilla5 phoneImg={telefonoInfo.modelo} id={id} />
            default:
                return <p>grilla 10</p>;
        }
    }



    return (
        <section className={styles.container}>
            {selectGrid(idGrilla)}
        </section>
    );
}

export default Detail;