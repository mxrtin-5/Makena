import { CartContext } from "../../context/cartContext";
import { FaShoppingCart } from 'react-icons/fa'


const CartIcon = () => {

    const { totalCantidad } = useContext(CartContext)

    return (
        <div className='icono'>
            <FaShoppingCart />
            <span className='span-icon'>{totalCantidad()}</span>
        </div>
    );
}

export default CartIcon;