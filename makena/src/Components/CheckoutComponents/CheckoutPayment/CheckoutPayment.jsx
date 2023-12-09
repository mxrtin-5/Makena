import styles from './CheckoutPayment.module.css'
import ButtonMP from '../../buttonMP/ButtonMP';
import { useContext } from 'react';
import { DataContext } from '../../../context/dataContext';
import CheckoutSucces from '../CheckoutSucces/CheckoutSucces';

const CheckoutPayment = () => {

    const { orderData, setOrderData } = useContext(DataContext);

    return (
        <div className={styles.payment}>
            <ButtonMP  />
            <div style={{display: 'none'}}>
                <CheckoutSucces orderData={orderData} setOrderData={setOrderData} />
            </div>
        </div>
    );
};

export default CheckoutPayment;