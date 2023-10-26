import { useState } from "react"
import { collection, addDoc} from "firebase/firestore"
import { db } from '../../firebase/config'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import styles  from './Contacto.module.css'


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
                    .max(2000,'El mensaje es muy largo')
                    .required("Obligatorio"),
    })
    
    
    const initialValues = {
                nombre: '',
                apellido: '',
                email:'',
                telefono:'',
                mensaje:''
    }


    const  handleSubmit = async (values) =>{


        const coment = collection(db, "mensajes")

        const comentario = {
            nombre: values.nombre,
            apelido: values.apellido,
            email: values.email,
            telefono: values.telefono,
            mensaje: values.mensaje,
            fecha: new Date()

        }

        const doc = await addDoc(coment, comentario)

        setComents(doc)
    }


    return (
        <div className={styles.containerContact}>
            <h2>Contacto</h2>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema} >
                {() => (
                    <Form className="form-contacto">
                        <div className={styles.divForm}>
                            <Field
                                className={styles.formontact}
                                placeholder="Tu nombre"
                                type="text"
                                name="nombre" />
                            <ErrorMessage name="nombre" component="p" />
                            <Field
                                className={styles.formontact}
                                placeholder="Apellido"
                                type="text"
                                name="apellido" />
                            <ErrorMessage name="apellido" component="p" />
                        </div>
                        <Field
                            className={styles.formontact}
                            placeholder="Tu email"
                            type="email"
                            name="email" />
                        <ErrorMessage name="email" component="p" />
                        <Field
                            className={styles.formontact}
                            placeholder="Telefono"
                            type="text"
                            name="telefono" />
                        <ErrorMessage name="telefono" component="p" />
                        <Field
                            className={styles.formontactMsj}
                            placeholder="Mensaje"
                            type="textarea"
                            name="mensaje" />
                        <ErrorMessage name="mensaje" component="p" />
                        <div className="buttons-reset-submit">
                            <button type="submit" className={styles.buttons} disabled={loading} >Enviar</button>
                            <button type="reset" className={styles.buttons}>Reset</button>
                        </div>
                    </Form>
                )}
            </Formik>


        </div>
    );
}

export default Contacto;