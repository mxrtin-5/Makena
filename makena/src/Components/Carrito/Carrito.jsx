import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import styles from './Carrito.module.css'
import { FaTrashAlt } from "react-icons/fa";


const Carrito = () => {

    const { cart, removerDelCarrito, vaciarCarrito } = useContext(CartContext);

    return (
        <div className={styles.containerCartProducts}>
            <div className={styles.cartProducts}>
                {cart.length === 0 ? (
                    <p>Vacio :(</p>
                ) : (
                    cart.map((product) => (
                        <div key={product.name} className={styles.cartProduct}>
                            <img src={product.img} alt={product.name} className={styles.productImage} />
                            <div className={styles.infoCartProduct}>
                                <div className={styles.tituloProductoCarrito}>{product.name}</div>
                                <div className={styles.precioProductoCarrito}>${product.price}</div>
                                <div className={styles.cantidadProductoCarrito}>{product.counter}</div>
                            </div>
                            <div className={styles.iconClose}>
                                <FaTrashAlt onClick={() => removerDelCarrito(product.name)} />
                            </div>
                        </div>
                    ))
                )}
                {cart.length > 0 && (
                    <div className={styles.cartTotal}>
                        <button onClick={vaciarCarrito} className={styles.btnTerminarCompra}>
                            Terminar Compra
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
};


export default Carrito;