import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import  styles  from './Carrito.module.css'


const Carrito = ({ datos }) => {

    const { cart, removerDelCarrito, vaciarCarrito } = useContext(CartContext)

    return (
        <div className={styles.containerCartProducts}>
            <h2>Carrito de Compra</h2>
            <div className={styles.cartProducts}>
                {cart.length === 0 ? (
                    <p>No hay productos en el carrito</p>
                ) : (
                    cart.map((product) => (
                        <div key={product.id} className={styles.cartProduct}>
                            <img src={product.img} alt={product.name} className={styles.productImage} />
                            <div className={styles.infoCartProduct}>
                                <div className={styles.tituloProductoCarrito}>{product.name}</div>
                                <div className={styles.precioProductoCarrito}>${product.price}</div>
                                <div className={styles.cantidadProductoCarrito}>{product.counter}</div>
                            </div>
                            <div className={styles.iconClose} >
                                <FaTrashAlt onClick={() => removerDelCarrito(product.id)} />
                            </div>
                        </div>
                    ))
                )}
                {cart.length > 0 && (
                    <div className={styles.cartTotal}>
                        <button onClick={vaciarCarrito} className={styles.btnTerminarCompra}>Terminar Compra</button>
                    </div>
                )}

            </div>


        </div>
    )
};


export default Carrito;