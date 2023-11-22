import { Navigate } from 'react-router-dom';
import ActualizarDatos from "../../Components/ActualizadDatos/ActualizarDatos";
import { useContext } from 'react';
import Login from '../Login/Login';
import { UserContext } from '../../context/userContext';

    
const Admin = () => {

    const { user } = useContext(UserContext)

        if (!user){
            return <Navigate to={'/login'} />
        }

    return (
        <div>
            {
                user ? <ActualizarDatos /> : <Login />
            }
        </div>
    );
};

export default Admin;