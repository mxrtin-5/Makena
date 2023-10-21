import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import styles from './Carrito.module.css'
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import CheckoutData from "../CheckoutComponents/CheckoutData/CheckoutData";


const Carrito = () => {
    const { cart, removerDelCarrito, vaciarCarrito, totalCompra, incrementarCantidad, decrementarCantidad  } = useContext(CartContext);

    const handleProductClick = (event) => {
        event.stopPropagation();
    };

    cart.map((product) => {
        console.log("Product:", product);
})

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
                            <button className={styles.btnTerminarCompra}>
                                <Link to={"/checkout"}>Terminar Compra</Link> 
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div style={{
                display: "none"
            }}>
                <CheckoutData data={cart.map((product) => {
        console.log("Product:", product);
})}/>
            </div>
        </div>
    );
};

export default Carrito;