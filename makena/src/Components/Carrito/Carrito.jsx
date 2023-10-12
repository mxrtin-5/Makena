import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import styles from './Carrito.module.css'
import { FaTrashAlt } from "react-icons/fa";


const Carrito = () => {

    const { cart, removerDelCarrito, vaciarCarrito, totalCompra, counter, setCounter } = useContext(CartContext);

    return (
        <div className={styles.containerCartProducts}>
            <div className={styles.cartProducts}>
                {cart.length === 0 ? (
                    <p>Vacio :(</p>
                ) : (
                    cart.map((product) => (
                        <div key={product.name} className={styles.cartProduct}>
                            <div className={styles.infoCartProduct}>
                                <div className={styles.tituloProductoCarrito}>{product.name}</div>
                                <div className={styles.precioProductoCarrito}>${product.price}</div>
                                <div className={styles.contenedorButtons}>
                                    <button className={styles.buttones} onClick={() => setCounter(counter + 1)}>+</button>
                                    <div>{counter}</div>
                                    <button className={styles.buttones} onClick={() => setCounter(counter > 1 ? counter - 1 : 1)}>-</button>
                                </div>


                            </div>
                            <div className={styles.iconClose}>
                                <FaTrashAlt onClick={() => removerDelCarrito(product.id)} />
                            </div>
                        </div>
                    ))
                )}
                <div>
                    <h5 style={{
                        color: "black",
                        fontSize: "10px"
                    }}>{totalCompra}</h5>
                </div>
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