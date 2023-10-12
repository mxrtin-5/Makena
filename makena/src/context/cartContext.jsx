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
            // Busca si el producto ya está en el carrito
            const existingProduct = prevCart.find((item) => item.id === product.id);
    
            if (existingProduct) {
                // Si el producto existe, actualiza su cantidad
                existingProduct.counter += product.counter;
                return [...prevCart];
            } else {
                // Si el producto no existe, agrégalo al carrito
                return [...prevCart, product];
            }
        });
    };

    const incrementarCantidad = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, counter: item.counter + 1 } : item
        );
        setCart(updatedCart);
    };

    const decrementarCantidad = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id && item.counter > 1 ? { ...item, counter: item.counter - 1 } : item
        );
        setCart(updatedCart);
    };

    const removerDelCarrito = (id) => {
        setCart(cart.filter((item) => item.id !== id))
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