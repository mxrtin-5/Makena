import { useContext, useState } from 'react';
import styles from './CheckoutData.module.css'
import { CartContext } from '../../../context/cartContext';
import { GrillasContext } from '../../../context/grillasContext';
import { DataContext } from '../../../context/dataContext';


const CheckoutData = ({ setEnvio, nextPage, eleccion }) => {

    const { cart } = useContext(CartContext);

    const { orderData, setOrderData, precioEnvioExtra, setPrecioEnvioExtra } = useContext(DataContext);

    const { translateX, translateY, escala } = useContext(GrillasContext)

    const [email, setEmail] = useState("");

    const [barrio, setBarrio] = useState('');

    const [localidad, setLocalidad] = useState('');

    const [provincia, setProvincia] = useState('')

    const [observasiones, setObservaciones] = useState('')

    const [codigoPostal, setCodigoPostal] = useState("");

    const [sucursal, setSucursal] = useState('')

    const [direccion, setDireccion] = useState("");

    const [opcionesEnvio, setOpcionesEnvio] = useState("Capital Federal");


    // const [precioEnvioExtra, setPrecioEnvioExtra] = useState(1300);

    // const [precioTotal, setPrecioTotal] = useState(0);
    console.log(orderData);

    const handleOpcionesEnvioChange = (e) => {
        const nuevaOpcionEnvio = e.target.value;

        let nuevoPrecioEnvioExtra = 0;
        if (nuevaOpcionEnvio === 'Capital Federal') {
            nuevoPrecioEnvioExtra = 1300;
        } else if (nuevaOpcionEnvio === "GBA") {
            nuevoPrecioEnvioExtra = 2200;
        } else if (nuevaOpcionEnvio === "Sucursal") {
            nuevoPrecioEnvioExtra = 1700;
        } else if (nuevaOpcionEnvio === "Domicilio") {
            nuevoPrecioEnvioExtra = 2200;
        }

        setPrecioEnvioExtra(nuevoPrecioEnvioExtra);
    };

    const areCamposCompletos = () => {
        return email && codigoPostal && direccion;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const precioTotal = cart.price + precioEnvioExtra;

        const ordenData = {
            ...orderData,
            cart: {
                ...cart,
                price: precioTotal,
            },
            email,
            localidad,
            provincia,
            barrio,
            sucursal,
            observasiones,
            codigoPostal,
            direccion,
            opcionesEnvio,
            translateX,
            translateY,
            eleccion,
            escala,
        };

        localStorage.setItem('orderData', JSON.stringify(ordenData));

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
                <option onSelect={() => setOpcionesEnvio('Capital Fededral')} value="Capital Federal">Capital Federal</option>
                <option onSelect={() => setOpcionesEnvio('GBA')} value="GBA">GBA</option>
                <option onSelect={() => setOpcionesEnvio('Sucursal')} value="Sucursal">Correo a Sucursal</option>
                <option onSelect={() => setOpcionesEnvio('Domicilio')} value="Domicilio">Correo a Domicilio</option>

            </select>

            <form onSubmit={handleSubmit}>
                {opcionesEnvio === "Capital Federal" && (
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
                        <input type="text"
                            placeholder='Barrio'
                            value={barrio}
                            onChange={(e) => setBarrio(e.target.value)}
                            required
                        />
                    </>
                )}

                {opcionesEnvio === "GBA" && (
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
                        <input type="text"
                            placeholder='Localidad'
                            value={localidad}
                            onChange={(e) => setLocalidad(e.target.value)}
                            required
                        />

                    </>
                )}

                {opcionesEnvio === "Sucursal" && (
                    <>
                        <input onChange={(e) => setProvincia(e.target.value)} value={provincia} placeholder='Provincia' type="text" required />
                        <input onChange={(e) => setSucursal(e.target.value)} value={sucursal} placeholder='Sucursal' type="text" required />
                    </>
                )}

                {opcionesEnvio === "Domicilio" && (
                    <>
                        <input onChange={(e) => setProvincia(e.target.value)} value={provincia} placeholder='Provincia' type="text" required />
                        <input type="text"
                            placeholder='Localidad'
                            value={localidad}
                            onChange={(e) => setLocalidad(e.target.value)}
                            required
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
                    </>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input value={observasiones} onChange={(e) => setObservaciones(e.target.value)} placeholder='Observasiones' className={styles.textArea} type="textarea" />

                <button
                    className={styles.buttonForm}
                    type="submit"
                    disabled={!areCamposCompletos()}
                >
                    Continuar
                </button>
                {precioEnvioExtra > 0 && (
                    <p>Costo de envío: ${precioEnvioExtra}</p>
                )}
                <p>Total: ${precioTotal}</p>
            </form>


        </div>
    );
};

export default CheckoutData;