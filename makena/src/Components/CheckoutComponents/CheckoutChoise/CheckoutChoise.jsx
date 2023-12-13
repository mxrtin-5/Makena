import { useContext, useState } from "react";
import { CartContext } from "../../../context/cartContext";
import styles from './CheckoutChoise.module.css'
import { DataContext } from "../../../context/dataContext";


const CheckoutChoise = ({ setEnvio, envio, nextPage, setEleccion }) => {

    const { cart } = useContext(CartContext);

    const { setOrderData } = useContext(DataContext)

    const [telefono, setTelefono] = useState("");

    const [nombre, setNombre] = useState("");

    const [apellido, setApellido] = useState("");

    const handleSubmit = (e, eleccion) => {
        e.preventDefault()

        const data = {
            cart,
            telefono,
            envio,
            nombre,
            apellido,
            eleccion
        }

        setEleccion(eleccion)
        setEnvio(eleccion)
        setOrderData(data)
        nextPage()
    }

    const areCamposCompletos = () => {
        return nombre && telefono && apellido;
    };

    return (
        <div className={styles.divContainer}>
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
                    type="text"
                    placeholder="Número de Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />

                <div className={styles.divBtn}>
                    <p className={styles.textoRetiro}>
                        Lanus Oeste a 15m de la estacion
                    </p>
                    <button
                        className={styles.buttonForm}
                        type="submit"
                        disabled={!areCamposCompletos()}
                        onClick={(e) => handleSubmit(e, 'retiro')}
                    >
                        Quiero Retirar
                    </button>
                    <button
                        className={styles.buttonForm}
                        type="submit"
                        disabled={!areCamposCompletos()}
                        onClick={(e) => handleSubmit(e, 'envio')}
                    >
                        Prefiero el Envio
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CheckoutChoise;