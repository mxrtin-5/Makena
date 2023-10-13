import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import styles from './Carrito.module.css'
import { FaTrashAlt } from "react-icons/fa";


const Carrito = () => {
    const { cart, removerDelCarrito, vaciarCarrito, totalCompra, incrementarCantidad, decrementarCantidad  } = useContext(CartContext);

    const handleProductClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div>
            <div className={styles.containerCartProducts}>
                <div className={styles.cartProducts}>
                    {cart.length === 0 ? (
                        <p>Vacio</p>
                    ) : (
                        cart.map((product) => (
                            <div key={product.name} className={styles.cartProduct} onClick={handleProductClick}>
                                <div className={styles.infoCartProduct}>
                                    <div className={styles.tituloProductoCarrito}>{product.name}</div>
                                    <div className={styles.precioProductoCarrito}>${product.price}</div>
                                    <div className={styles.contenedorButtons}>
                                        <button className={styles.buttones} onClick={() => decrementarCantidad(product.name)}>-</button>
                                        <div>{product.counter}</div>
                                        <button className={styles.buttones} onClick={() => incrementarCantidad(product.name)}>+</button>
                                    </div>
                                </div>
                                <div className={styles.iconClose}>
                                    <FaTrashAlt onClick={() => removerDelCarrito(product.name)} />
                                </div>
                            </div>
                        ))
                    )}

                    {cart.length > 0 && (
                        <div className={styles.cartTotal}>
                            <p>Total: ${totalCompra()}</p>
                            <button onClick={vaciarCarrito} className={styles.btnTerminarCompra}>
                                Terminar Compra
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Carrito;