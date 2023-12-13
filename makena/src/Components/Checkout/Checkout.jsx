import { useContext, useState } from 'react';
import styles from './Checkout.module.css';
import CheckoutData from '../CheckoutComponents/CheckoutData/CheckoutData';
import CheckoutPayment from '../CheckoutComponents/CheckoutPayment/CheckoutPayment';
import CheckoutChoise from '../CheckoutComponents/CheckoutChoise/CheckoutChoise';
import { DataContext } from '../../context/dataContext';



const Checkout = () => {

    const [page, setPage] = useState(0);

    const [eleccion, setEleccion] = useState('');

    const [envio, setEnvio] = useState('');

    const { orderData } = useContext(DataContext);

    const FormTitles = ["Datos Personales", "Confirmar los datos", "Pago"];

    // Función para avanzar a la siguiente página
    const nextPage = () => {
        if(page < 2){
            setPage(page + 1);
        }
    };

    return (
        <div className={styles.form}>
            <div className={styles.progressBar}><div style={{
                width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%"
            }}></div></div>
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className={styles.body}>
                    {page === 0 && (
                        <CheckoutChoise
                            setEnvio={setEnvio}
                            envio={envio}
                            nextPage={nextPage}
                            setEleccion={setEleccion}
                        />
                    )}
                    {page === 1 && (
                        eleccion === 'retiro' ? (
                            <CheckoutPayment />
                        ) : eleccion === 'envio' ? (
                            <CheckoutData
                                setEnvio={setEnvio}
                                nextPage={nextPage}
                                eleccion={eleccion} />
                        ) : (
                            <p>Seleccione una opción</p>
                        )
                    )}
                    {page === 2 && (
                        <CheckoutPayment
                        />
                    )}
                </div>
                <div className={styles.footer}>
                    <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Volver</button>
                </div>

            </div>
        </div>
    );
}

export default Checkout;