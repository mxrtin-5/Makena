import { useContext, useEffect, useState } from 'react';
import styles from './CheckoutData.module.css'
import { CartContext } from '../../../context/cartContext';
import { GrillasContext } from '../../../context/grillasContext';
import { DataContext } from '../../../context/dataContext';


const CheckoutData = ({ setEnvio, nextPage, eleccion }) => {

    const { cart, totalCompra, precioTotal, setPrecioTotal } = useContext(CartContext);

    const { orderData, setOrderData, precioEnvioExtra, setPrecioEnvioExtra } = useContext(DataContext);

    const { translateX, translateY, escala } = useContext(GrillasContext)

    const [email, setEmail] = useState("");

    const [barrio, setBarrio] = useState('');

    const [localidad, setLocalidad] = useState('');

    const [provincia, setProvincia] = useState('')

    const [observasiones, setObservaciones] = useState('')

    const [codigoPostal, setCodigoPostal] = useState("");

    const [sucursal, setSucursal] = useState('');

    const [direccion, setDireccion] = useState("");

    const [opcionesEnvio, setOpcionesEnvio] = useState('capital_federal');

    useEffect(() =>{
        setPrecioTotal(totalCompra() + 1300)
    }, [])

    const handleOpcionesEnvioChange = (e) => {
        setOpcionesEnvio(e.target.value);

        let nuevoPrecioEnvioExtra = 0;

        switch (opcionesEnvio) {
            case 'capital_federal':
                nuevoPrecioEnvioExtra = 1300;
                break
            case "gba":
                nuevoPrecioEnvioExtra = 2200;
                break
            case 'sucursal':
                nuevoPrecioEnvioExtra = 1700;
                break
            case "domicilio":
                nuevoPrecioEnvioExtra = 2200;
                break;
        }
        setPrecioEnvioExtra(Number(nuevoPrecioEnvioExtra));

        // Update the total price
        const newTotalPrice = totalCompra() + Number(nuevoPrecioEnvioExtra);
        setPrecioTotal(newTotalPrice);
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
                <option value="capital_federal">Capital Federal</option>
                <option value="gba">GBA</option>
                <option value="sucursal">Correo a sucursal</option>
                <option value="domicilio">Correo a domicilio</option>

            </select>

            <form onSubmit={handleSubmit}>
                {opcionesEnvio === "capital_federal" && (
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

                {opcionesEnvio === "gba" && (
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

                {opcionesEnvio === "sucursal" && (
                    <>
                        <input onChange={(e) => setProvincia(e.target.value)} value={provincia} placeholder='Provincia' type="text" required />
                        <input onChange={(e) => setSucursal(e.target.value)} value={sucursal} placeholder='Sucursal' type="text" required />
                    </>
                )}

                {opcionesEnvio === "domicilio" && (
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


        </div >
    );
};

export default CheckoutData;