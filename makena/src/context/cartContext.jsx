import { createContext, useState } from "react";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


export const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const [precioTotal, setPrecioTotal] = useState(0);

    const [counter, setCounter] = useState(1);

    const agregarAlCarrito = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.name === product.name);

            Toastify({
                text: "Añadido al carrito",
                className: "info",
                duration: 1000,
                style: {
                    background: "linear-gradient(to right, #6b16bb, #d21bd8)",
                }
            }).showToast();

            if (existingProduct) {
                const updatedCart = prevCart.map((item) =>
                    item.name === product.name
                        ? { ...item, counter: (item.counter || 0) + 1 }
                        : item
                );
                return updatedCart;
            } else {
                return [...prevCart, { ...product, counter: 1 }];
            }
        });
    };

    const incrementarCantidad = (name) => {
        const updatedCart = cart.map((item) =>
            item.name === name ? { ...item, counter: item.counter + 1 } : item
        );
        setCart(updatedCart);
    };

    const decrementarCantidad = (name) => {
        const updatedCart = cart.map((item) =>
            item.name === name && item.counter > 1
                ? { ...item, counter: item.counter - 1 }
                : item
        );
        setCart(updatedCart);
    };

    const removerDelCarrito = (name) => {
        setCart(cart.filter((item) => item.name !== name))
    }

    const isInCart = (id) => {
        return cart.some((item) => item.id === id)
    }

    const totalCompra = () => {
        return cart.reduce((acc, item) => {
            return acc + item.price * (item.counter || 1);
        }, 0);
    };

    const totalCantidad = () => {
        return cart.reduce((acc, item) => acc + item.counter, 0)
    }

    const vaciarCarrito = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{
            cart,
            agregarAlCarrito,
            incrementarCantidad,
            decrementarCantidad,
            counter,
            setCounter,
            isInCart,
            totalCompra,
            vaciarCarrito,
            totalCantidad,
            removerDelCarrito,
            precioTotal,
            setPrecioTotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;