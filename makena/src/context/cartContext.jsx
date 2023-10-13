import { createContext, useState } from "react";


export const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const [counter, setCounter] = useState(1)

    // const obtenerPrecioDesdeFirebase = async (productID) => {
    //     console.log(productID);
    //     try {
    //         
    //         if (typeof productID !== 'string' || productID.trim() === '') {
    //             throw new Error("productID no es una cadena válida.");
    //         }

    //       
    //         const docRef = doc(db, "celulares", productID);
    //         const docSnapshot = await getDoc(docRef);

    //         if (docSnapshot.exists()) {
    //            
    //             return docSnapshot.data().price;
    //         } else {
    //             throw new Error("Producto no encontrado en Firebase.");
    //         }
    //     } catch (error) {
    //         console.error("Error al obtener precio desde Firebase:", error);
    //         throw error;
    //     }
    // };

    const agregarAlCarrito = (product) => {
        setCart((prevCart) => {

            const existingProduct = prevCart.find((item) => item.name === product.name);

            if (existingProduct) {
                const updatedCart = prevCart.map((item) =>
                    item.name === product.name
                        ? { ...item, counter: item.counter + product.counter }
                        : item
                );
                return updatedCart;
            } else {
                return [...prevCart, { ...product }];
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
            return acc + item.price * item.counter;
        }, 0);
    }

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
            removerDelCarrito
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;