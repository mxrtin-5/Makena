import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import styles from './Login.module.css'


const Login = () => {

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const auth = getAuth();


    const submitHandler = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setUser(true)
            navigate('/admin');
        } catch (error) {
            Toastify({
                text: "No existe tal usuario",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            console.error('Error al iniciar sesión:', error.message);

        }
    };


    return (
        <div className={styles.divPadre}>
            <h1>Inicia sesión</h1>
            <form className={styles.formulario} onSubmit={submitHandler} action="">
                <label>Correo electrónico:</label>
                <input id="email" type="email" />
                <label>Contraseña:</label>
                <input id="password" type="password" />
                <input type="submit" value="Iniciar sesión" />
            </form>
        </div>
    );
}

export default Login;