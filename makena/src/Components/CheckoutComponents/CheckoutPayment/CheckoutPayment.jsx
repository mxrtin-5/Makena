import styles from './CheckoutPayment.module.css'
import ButtonMP from '../../buttonMP/ButtonMP';

const CheckoutPayment = () => {
    return (
        <div className={styles.payment}>
            <ButtonMP />
        </div>
    );
};

export default CheckoutPayment;