import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { FaShoppingCart } from 'react-icons/fa'
import styles from './CartIcon.module.css'


const CartIcon = () => {

    const { totalCantidad } = useContext(CartContext)

    return (
        <div className={styles.icono}>
            <FaShoppingCart />
            <span className={styles.spanIcon}>{totalCantidad()}</span>
        </div>
    );
}

export default CartIcon;