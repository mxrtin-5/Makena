import { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { FaShoppingCart } from "react-icons/fa";
import styles from './CartIcon.module.css'
import Carrito from "../Carrito/Carrito";


const CartIcon = () => {

    const [cartOpen, setCartOpen] = useState(false)

    const toggleCartOpen = () => {
        setCartOpen(!cartOpen)
    }

    const { totalCantidad} = useContext(CartContext)

    return (
        <div onClick={toggleCartOpen} className={styles.icono}>
            <FaShoppingCart style={{ color: "white", display: "block" }} />
            <span className={styles.spanIcon}>{totalCantidad()}</span>
            {
                cartOpen ? <Carrito /> : null
            }
        </div>
    );
}

export default CartIcon;