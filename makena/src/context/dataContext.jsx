import { createContext, useState } from "react";

export const DataContext = createContext()


const DataProvider = ({ children }) => {

    const [nombre, setNombre] = useState("");

    const [apellido, setApellido] = useState("");

    const [email, setEmail] = useState("");

    const [telefono, setTelefono] = useState("");

    const [codigoPostal, setCodigoPostal] = useState("");

    const [direccion, setDireccion] = useState("");

    const [orderData, setOrderData] = useState('');

    const [opcionesEnvio, setOpcionesEnvio] = useState("Capital Federal");

    const ordenData = {
        nombre,
        apellido,
        email,
        telefono,
        codigoPostal,
        direccion,
        opcionesEnvio,
    };

    return (
        <DataContext.Provider
            value={{
                nombre,
                setNombre,
                apellido,
                setApellido,
                email,
                setEmail,
                telefono,
                setTelefono,
                codigoPostal,
                setCodigoPostal,
                direccion,
                setDireccion,
                opcionesEnvio,
                setOpcionesEnvio,
                ordenData,
                orderData,
                setOrderData
            }}>

            {children}

        </DataContext.Provider>
    );
}

export default DataProvider;