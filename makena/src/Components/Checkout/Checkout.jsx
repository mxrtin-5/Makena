import { useState } from 'react';
import styles from './Checkout.module.css'
import CheckoutData from '../CheckoutComponents/CheckoutData/CheckoutData';
import CheckoutPayment from '../CheckoutComponents/CheckoutPayment/CheckoutPayment';
import CheckoutSucces from '../CheckoutComponents/CheckoutSucces/CheckoutSucces';


const Checkout = () => {

    const [page, setPage] = useState(0)

    const [orderData, setOrderData] = useState(null);

    const FormTitles = ["Datos Personales", "Pago", "Completado"]

    // Función para avanzar a la siguiente página
    const nextPage = () => {
        setPage(page + 1);
    };

    // Función para retroceder a la página anterior (si es necesario)
    const prevPage = () => {
        setPage(page - 1);
    };

    return (
        <div className={styles.form}>
            <div className={styles.progressBar}><div style={{
                width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%"
            }}></div></div>
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className={styles.body}>
                    {page === 0 && (
                        <CheckoutData
                            nextPage={nextPage}
                            setOrderData={setOrderData}
                        />
                    )}
                    {page === 1 && (
                        <CheckoutPayment
                            orderData={orderData}
                        />
                    )}
                    {page === 2 && (
                        <CheckoutSucces />
                    )}
                </div>
                <div className={styles.footer}>
                    <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Prev</button>
                </div>

            </div>
        </div>
    );
}

export default Checkout;