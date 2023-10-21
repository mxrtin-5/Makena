import { useState } from 'react';
import styles from './CheckoutData.module.css'


const CheckoutData = ({ setOrderData, nextPage, data }) => {


    const [nombre, setNombre] = useState("");

    const [apellido, setApellido] = useState("");

    const [email, setEmail] = useState("");

    const [telefono, setTelefono] = useState("");

    const [codigoPostal, setCodigoPostal] = useState("");

    const [direccion, setDireccion] = useState("");

    const [opcionesEnvio, setOpcionesEnvio] = useState("Capital Federal");

    const areCamposCompletos = () => {
        return nombre && apellido && email && codigoPostal && direccion;
    };

    console.log(data);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            nombre,
            apellido,
            email,
            telefono,
            codigoPostal,
            direccion,
            opcionesEnvio,
            prodName: data.name,
            price: data.price,
            cantidad: data.counter,
            modelo:data.modelo

        };
        console.log(orderData);
        setOrderData(orderData)
        nextPage()
    };


    return (
        <div className={styles.data}>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="text" placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder='Número de Teléfono' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <input type="text" placeholder='Código Postal' value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} required />
                <input type="text" placeholder='Dirección' value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                <select name="opcionesEnvio" value={opcionesEnvio} onChange={(e) => setOpcionesEnvio(e.target.value)} required>
                    <option value="Capital Federal">Capital Federal</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Interior">Interior</option>
                </select>

                <button className={styles.buttonForm} type="submit" disabled={!areCamposCompletos()}>Continuar</button>

            </form>
        </div>
    );
}

export default CheckoutData;