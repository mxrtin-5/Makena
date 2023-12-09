import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from '../../firebase/config'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styles from './Contacto.module.css'
import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'


const Contacto = () => {

    const [loading, setLoading] = useState(false)
    const [coments, setComents] = useState(null)


    const schema = Yup.object().shape({
        nombre: Yup.string()
            .min(1, "El nombre es demasiado corto")
            .max(20, "Máximo 20 caracteres")
            .required("Obligatorio"),
        apellido: Yup.string()
            .min(1, "La direccion es demasiado corta")
            .max(20, "Máximo 20 caracteres")
            .required("Obligatorio"),
        email: Yup.string()
            .email("El email es inválido")
            .required("Obligatorio"),
        telefono: Yup.string()
            .min(1, 'El telefono es demasiado corto')
            .max(20, 'El numero es demasiado largo'),
        mensaje: Yup.string()
            .min(3, 'El mensaje es demasido corto')
            .max(2000, 'El mensaje es muy largo')
            .required("Obligatorio"),
    })


    const initialValues = {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        mensaje: ''
    }


    const handleSubmit = async (values) => {


        const coment = collection(db, "mensajes")

        const comentario = {
            nombre: values.nombre,
            apelido: values.apellido,
            email: values.email,
            telefono: values.telefono,
            mensaje: values.mensaje,
            fecha: new Date()

        }

        Toastify({
            text: "Mensaje enviado con exito",
            className: "info",
            style: {
                background: "linear-gradient(to right, #6b16bb, #d21bd8)",
            }
        }).showToast();

        const doc = await addDoc(coment, comentario)

        setComents(doc)
    }


    return (
        <div className={styles.containerContact}>
            <div>
                <h2>Contacto</h2>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema} >
                    {() => (
                        <div className={styles.container}>
                            <Form className={styles.formContact}>

                                <div className={styles.divForm}>
                                    <label className={styles.labelName} htmlFor="">Tu nombre*</label>
                                    <Field
                                        className={styles.formontact}
                                        type="text"
                                        name="nombre" />
                                    <label className={styles.label} htmlFor="">Tu apellido*</label>
                                    <Field
                                        className={styles.formontact}
                                        type="text"
                                        name="apellido" />
                                </div>
                                <label className={styles.sorete} htmlFor="">Tu Email*</label>
                                <Field
                                    className={styles.formontact}
                                    type="email"
                                    name="email" />
                                <label className={styles.sorete1} htmlFor="">Tu numero</label>
                                <Field
                                    className={styles.formontact}
                                    type="text"
                                    name="telefono" />
                                <label className={styles.sorete1} htmlFor="">Tu mensaje*</label>
                                <Field
                                    className={styles.formontactMsj}
                                    type="textarea"
                                    name="mensaje" />

                                <div className="buttons-reset-submit">
                                    <button type="submit" className={styles.buttons} disabled={loading} >Enviar</button>
                                    <button type="reset" className={styles.buttons}>Reset</button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>


        </div>
    );
}

export default Contacto;