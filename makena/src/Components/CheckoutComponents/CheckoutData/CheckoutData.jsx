import { useContext, useState } from 'react';
import styles from './CheckoutData.module.css'
import { CartContext } from '../../../context/cartContext';
import { GrillasContext } from '../../../context/grillasContext';
import { DataContext } from '../../../context/dataContext';


const CheckoutData = ({ setEnvio, nextPage, eleccion }) => {

    const { cart } = useContext(CartContext);

    const { orderData, setOrderData } = useContext(DataContext)

    const { translateX, translateY, escala } = useContext(GrillasContext)

    const [email, setEmail] = useState("");

    const [observasiones, setObservaciones] = useState('')

    const [codigoPostal, setCodigoPostal] = useState("");

    const [sucursal, setSucursal] = useState('')

    const [direccion, setDireccion] = useState("");

    const [opcionesEnvio, setOpcionesEnvio] = useState("Capital Federal");

    const [precioEnvioExtra, setPrecioEnvioExtra] = useState(0);

    const handleOpcionesEnvioChange = (e) => {
        const nuevaOpcionEnvio = e.target.value;

        // Lógica para determinar el precio adicional según la opción de envío
        let nuevoPrecioEnvioExtra = 0;
        if (nuevaOpcionEnvio === "Buenos Aires") {
            nuevoPrecioEnvioExtra = 1300; // Puedes ajustar este valor según tus necesidades
        } else if (nuevaOpcionEnvio === "GBA") {
            nuevoPrecioEnvioExtra = 2200; // Puedes ajustar este valor según tus necesidades
        } else if (nuevaOpcionEnvio === "Sucursal") {
            nuevoPrecioEnvioExtra = 1700; // Puedes ajustar este valor según tus necesidades
        } else if (nuevaOpcionEnvio === "Domicilio") {
            nuevoPrecioEnvioExtra = 2200; // Puedes ajustar este valor según tus necesidades
        }

        setOpcionesEnvio(nuevaOpcionEnvio);
        setPrecioEnvioExtra(nuevoPrecioEnvioExtra);
    };

    const areCamposCompletos = () => {
        return email && codigoPostal && direccion;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const ordenData = {
            ...orderData,
            cart: {
                ...cart,
                price: cart.price + precioEnvioExtra,
            },
            email,
            sucursal,
            observasiones,
            codigoPostal,
            direccion,
            opcionesEnvio,
            translateX,
            translateY,
            eleccion,
            escala
        };

        setOrderData(ordenData);
        setEnvio(opcionesEnvio);
        nextPage();
    };

    return (
        <div className={styles.data}>

            <select
                name="opcionesEnvio"
                value={opcionesEnvio}
                onChange={handleOpcionesEnvioChange}
                required
            >
                <option setOpcionesEnvio={'Capital Federal'} value="Capital Federal">Capital Federal</option>
                <option setOpcionesEnvio={'GBA'} value="GBA">GBA</option>
                <option setOpcionesEnvio={'Sucursal'} value="Sucursal">Correo SUC</option>
                <option setOpcionesEnvio={'Domicilio'} value="Domicilio">Correo DOM</option>

            </select>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {opcionesEnvio !== "Sucursal" && (
                    <>
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
                    </>
                )}

                {opcionesEnvio === "Sucursal" && (
                    <>
                        <input onChange={(e) => setSucursal(e.target.value)} value={sucursal} placeholder='Ingrese sucursal' type="text" required />
                    </>
                )}

                <input value={observasiones} onChange={(e) => setObservaciones(e.target.value)} placeholder='Observasiones' className={styles.textArea} type="textarea" />

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