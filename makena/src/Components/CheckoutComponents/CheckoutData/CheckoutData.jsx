import { useContext, useState } from 'react';
import styles from './CheckoutData.module.css'
import { CartContext } from '../../../context/cartContext';
import { GrillasContext } from '../../../context/grillasContext';


const CheckoutData = ({ setOrderData, nextPage, data }) => {

    const { cart } = useContext(CartContext);

    const { translateX, translateY, escala } = useContext(GrillasContext)

    const [nombre, setNombre] = useState("");

    const [apellido, setApellido] = useState("");

    const [email, setEmail] = useState("");

    const [telefono, setTelefono] = useState("");

    const [codigoPostal, setCodigoPostal] = useState("");

    const [direccion, setDireccion] = useState("");

    const [opcionesEnvio, setOpcionesEnvio] = useState("Capital Federal");

    const [precioEnvioExtra, setPrecioEnvioExtra] = useState(0);

    const handleOpcionesEnvioChange = (e) => {
        const nuevaOpcionEnvio = e.target.value;

        // Lógica para determinar el precio adicional según la opción de envío
        let nuevoPrecioEnvioExtra = 0;
        if (nuevaOpcionEnvio === "Buenos Aires") {
            nuevoPrecioEnvioExtra = 200; // Puedes ajustar este valor según tus necesidades
        } else if (nuevaOpcionEnvio === "Interior") {
            nuevoPrecioEnvioExtra = 350; // Puedes ajustar este valor según tus necesidades
        }

        setOpcionesEnvio(nuevaOpcionEnvio);
        setPrecioEnvioExtra(nuevoPrecioEnvioExtra);
    };

    const areCamposCompletos = () => {
        return nombre && apellido && email && codigoPostal && direccion;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const ordenData = {
            cart: {
                ...cart,
                price: cart.price + precioEnvioExtra,
            },
            nombre,
            apellido,
            email,
            telefono,
            codigoPostal,
            direccion,
            opcionesEnvio,
            translateX,
            translateY,
            escala
        };

        setOrderData(ordenData);
        nextPage();
    };

    return (
        <div className={styles.data}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Número de Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Código Postal"
                    value={codigoPostal}
                    onChange={(e) => setCodigoPostal(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                />
                <select
                    name="opcionesEnvio"
                    value={opcionesEnvio}
                    onChange={handleOpcionesEnvioChange}
                    required
                >
                    <option value="Capital Federal">Capital Federal</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Interior">Interior</option>
                </select>

                {precioEnvioExtra > 0 && (
                    <p>Precio extra: ${precioEnvioExtra}</p>
                )}

                <button
                    className={styles.buttonForm}
                    type="submit"
                    disabled={!areCamposCompletos()}
                >
                    Continuar
                </button>
            </form>
        </div>
    );
};

export default CheckoutData;